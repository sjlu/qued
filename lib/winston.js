var winston = require('winston');
var config = require('./config');

winston.remove(winston.transports.Console);

if (config.get('log')) {
  winston.add(winston.transports.Console, {
    colorize: true
  });
}

module.exports = winston;