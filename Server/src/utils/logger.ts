import { format } from 'node:path';
import winston from 'winston';

const lofFomat = winston.format.combine(
    winston.format.timestamp( {format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message , stack}) => {
        return stack
         ? `${timestamp} [${level.toUpperCase()}]: $${message}\n ${stack}`:
           `${timestamp} [${level.toUpperCase()}]: ${message}`;

    })
);

const logger = winston.createLogger({
    level: 'process.env.NODE_ENV === "development" ? "debug" : "info"',
    format: lofFomat,
    transports: [
        new winston.transports.Console(
            {
                format: winston.format.combine(
                    winston.format.colorize(),
                    lofFomat
                )
            }
         ),

         new winston.transports.File({
             filename: 'logs/error.log',
             level: 'error',
             }),
     ],
});
    
export default logger;