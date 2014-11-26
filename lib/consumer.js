var Job = require('./job');
var queue = require('./queue');

module.exports = (function() {

  function Consumer() {}

  Consumer.prototype.create = function(name, data) {
    var job = new Job({
      name: name,
      data: data
    });

    job.save = function(cb) {
      queue.push(this, cb);
    }

    return job;
  }

  return Consumer;

})();