var winston = require('winston');
var config = require('./config');

winston.remove(winston.transports.Console);

winston.add(winston.transports.Console, {
  colorize: true,
  level: (config.get('log')) ? 'info' : 'warn',
  label: 'qued'
});

module.exports = winston;
