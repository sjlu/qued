var queue = require('./queue');
var Job = require('./job');
var winston = require('./winston');
var _ = require('lodash');

module.exports = (function() {

  var workerProcesses = {};

  function Worker(processes) {
    workerProcesses = processes;
    waitForJob();
  }

  function execJob(job) {
    winston.info('worker: executing job', job);
    workerProcesses[job.name](job, function(err) {
      if (err) {
        winston.error('worker: job errored out', job);
        console.log(err);
        waitForJob();
        return;
      }
      winston.info('worker: job completed', job);
      waitForJob();
    });
  }

  function waitForJob() {
    winston.info('worker: waiting for job');
    queue.pop(function(err, data) {
      if (err) {
        winston.error('worker: error occured while receiving job', err);
        return waitForJob();
      }
      winston.info('worker: received job data', _.last(data));
      var job = new Job(_.last(data));
      execJob(job);
    });
  }

  return Worker;

})();