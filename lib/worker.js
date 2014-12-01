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

  function execJob(job) {
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
    winston.info('worker: waiting for job');
    queue.pop(function(err, data) {
      if (err) {
        winston.error('worker: error occured while receiving job');
        console.log(err);

        return waitForJob();
      }
      data = _.last(data);
      winston.info('worker: received job data', data);
      var job = new Job(data);
      execJob(job);
    });
  }

  return Worker;

})();