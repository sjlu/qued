var redis = require('./redis');
var config = require('./config');

var PREFIX = config.get('PREFIX');
var LIST = PREFIX + 'queue';

module.exports.push = function(value, cb) {
  var valueString = JSON.stringify();
  redis.lpush(LIST, valueString, cb);
}

// this is a waiting pop, it'll throw the callback
// when there is something on the stack
module.exports.pop = function(cb) {
  redis.blpop(LIST, cb);
}