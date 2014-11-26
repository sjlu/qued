var queue = require('./queue');
var Job = require('./job');

var Worker = (function() {

  function Worker() {}

  function execJob(job) {

  }

  function waitForJob() {
    queue.pop(function(err, data) {
      if (err) return waitForJob();
      var job = new Job(data);
      execJob(job);
    });
  }

  return Worker;

});