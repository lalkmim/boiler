import config from '../config';
import winston from 'winston';
import { Papertrail } from 'winston-papertrail';

const log = new winston.Logger({
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
                return '[' + level.toUpperCase().substring(0, 1) + '] ' + message;
  			}
        })
    ]
});

log.i = log.info;
log.d = log.debug;
log.e = log.error;
log.w = log.warn;
log.s = log.silly;

export default log;