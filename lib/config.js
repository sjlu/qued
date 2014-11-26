var Config = (function() {

  function Config() {};
  var store = {
    PREFIX: 'qued:'
  };

  Config.prototype.put = function(key, value) {
    key = key.toUpperCase();
    store[key] = value;
    return store[key];
  }

  Config.prototype.get = function(key) {
    key = key.toUpperCase();
    return store[key];
  }

  return Config;

})();

module.exports = new Config();