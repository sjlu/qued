var redis = require('./redis');
var queue = require('./queue');
var Job = require('./job');
var winston = require('./winston');
var _ = require('lodash');
var timeout = require('./timeout');
var config = require('./config');

module.exports = (function() {

  var workerProcesses = {};

  function Worker(processes) {
    workerProcesses = processes;
    waitForJob();
  }

  // 0: waiting
  // 1: received
  // 2: executing
  var workerState = 0;

  // safely attaches a shutdown function
  // which prevents jobs from being cut off
  // midway
  var shutdownFn;
  Worker.prototype.shutdown = function(cb) {
    winston.info('worker: received shutdown');
    // kill all redis connections immediately
    // so that way the workerState cannot shift
    // from waiting to receiving.
    redis.quit();

    shutdownFn = function() {
      cb(); // safe to exit
      winston.info('worker: successfully shutdown');
    }

    // if the state of the worker is 'waiting',
    // then we can shutdown safely
    if (workerState === 0) {
      shutdownFn();
    }
  }

  function execJob(job) {
    workerState = 2;

    if (!workerProcesses[job.name]) {
      winston.error('worker: unknown job pushed on the stack', job);
      waitForJob();
      return;
    }

    winston.info('worker: executing job', job);
    winston.profile('worker: execution time', job); // does not print

    var done = function(err) {
      winston.profile('worker: execution time');

      if (err) {
        winston.error('worker: job errored out', job);
        console.log(err);

        waitForJob();
        return;
      }
      winston.info('worker: job completed', job);
      waitForJob();
    }

    done = timeout(done, config.get('timeout'));

    workerProcesses[job.name](job, done);
  }

  function waitForJob() {
    workerState = 0;
    winston.info('worker: waiting for job');

    // if the shutdown function is set
    // stop right here cause we shouldn't
    // execute any more jobs
    if (shutdownFn) {
      return shutdownFn();
    }

    queue.pop(function(err, data) {
      workerState = 1;

      if (err) {
        winston.error('worker: error when receiving job data');
        console.log(err);

        return waitForJob();
      }

      var job;
      try {
        job = new Job(_.last(data));
      } catch (err) {
        winston.error('worker: error when interpreting job data');
        console.log(err);
      }

      winston.info('worker: received job', job);
      execJob(job);
    });
  }

  return Worker;

})();