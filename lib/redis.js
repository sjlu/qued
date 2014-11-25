var redis = require('redis');
var _ = require('lodash');
var config = require('./config');

var clientOpts = {};
if (config.get('REDIS_PASSWORD')) {
  clientOpts.auth_pass = config.get('REDIS_PASSWORD');
}

module.exports = redis.createClient(
  config.get('REDIS_PORT') || 6379,
  config.get('REDIS_HOSTNAME') || 'localhost',
  clientOpts
);
