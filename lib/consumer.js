var Job = require('./job');
var queue = require('./queue');
var winston = require('./winston');

module.exports = (function() {

  function Consumer() {}

  Consumer.prototype.create = function(name, data) {
    var job = new Job({
      name: name,
      data: data
    });

    job.save = function(cb) {
      var stack = new Error().stack;
      console.log(stack);
      winston.info('consumer: job pushed on stack', this);
      queue.push(this, cb);
    }

    return job;
  }

  return Consumer;

})();