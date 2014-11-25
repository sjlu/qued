var expect = require('chai').expect;

var redis = require('../lib/redis');

describe('redis', function() {
  it('should properly connect to a redis instance', function(done) {
    redis.ping(done);
  });
});