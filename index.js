var _ = require('lodash');
var config = require('./lib/config');

module.exports = (function() {

  function Qued(configVars) {
    // instantiation
    _.each(configVars, function(v, k) {
      config.set(k, v);
    });
  };

  var processes = {};

  Qued.prototype.addProcess = function(processName, processFunction) {
    processes[processName] = processFunction;
  }

  // kue drop-in
  Qued.prototype.process = Qued.prototype.addProcess;

  Qued.prototype.createWorker = function() {
    var Worker = require('./lib/worker');
    return new Worker(processes);
  }

  Qued.prototype.createConsumer = function() {
    var Consumer = require('./lib/consumer');
    return new Consumer();
  }

  return Qued;

})();