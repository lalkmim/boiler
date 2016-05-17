var config = require('../config');
var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;
var log = new winston.Logger({
    transports: [
        new winston.transports.File({
            filename: './logs/general.log',
            level: 'debug',
            json: true,
            timestamp: true
        }),
        new Papertrail({
            level: 'debug',
            host: config.log.papertrail.host,
            port: config.log.papertrail.port,
            program: config.log.papertrail.program,
            logFormat: function(level, message) {
                console.log(level, level.length);
  			    return '[' + level.toUpperCase().substring(0, 4) + '] ' + message;
  			}
        })
    ]
});

log.i = log.info;
log.d = log.debug;
log.e = log.error;
log.w = log.warn;
log.t = log.trace;

module.exports = log;