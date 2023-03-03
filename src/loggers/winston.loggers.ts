import { ErrorRequestHandler } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import winston from 'winston';

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
);

export const winstonLogger = winston.createLogger({
  format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'handbook.log' }),
  ],
});

export const internalServerErrorLogger: ErrorRequestHandler = (err, req, res) => {
  winstonLogger.error(`${err.name}: ${err.message}`);
  if (err instanceof EntityNotFoundError) {
    res.status(404).json({ error: 'Entity not found' });
  } else if (err instanceof QueryFailedError) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
