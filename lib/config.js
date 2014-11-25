var Config = (function() {

  function Config() {};
  var store = {};

  Config.prototype.put = function(key, value) {
    store[key] = value;
    return store[key];
  }

  Config.prototype.get = function(key) {
    return store[key];
  }

  return Config;

})();

module.exports = new Config();