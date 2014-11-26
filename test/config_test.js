var expect = require('chai').expect;

var config = require('../lib/config');

describe('config', function() {
  it('should set a variable and retrieve the same value', function(done) {
    var inputValue = 'random_Value';
    config.set('test', inputValue);
    expect(config.get('test')).to.equal(inputValue);
    done();
  });

  it('should be a singleton instance', function(done) {
    var newRefOfConfig = require('../lib/config');
    expect(config.get('test')).to.not.be.empty;
    done();
  });
});