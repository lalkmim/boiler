var winston = require('winston');
var log = new (winston.Logger) ({
    transports: [
        new (winston.transports.File) ({
            filename: './logs/general.log',
            level: 'debug',
            json: true,
            timestamp: true
        })
    ]
});

log.i = log.info;
log.d = log.debug;
log.e = log.error;
log.w = log.warn;

module.exports = log;