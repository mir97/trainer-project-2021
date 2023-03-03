import express from 'express';
import { customTokenMorganForMiddleWear } from './loggers/morgan.loggers';
import { connectPostgres } from './data-access/postgres';
import { startServer } from './server';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { addAsync } from '@awaitjs/express';

import { winstonLogger } from './loggers/winston.loggers';

const app = addAsync(express());

async function runApp() {
  try {
    customTokenMorganForMiddleWear();

    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      ssl: { rejectUnauthorized: false },
      seeds: ['src/seeds/**/*{.ts,.js}'],
      factories: ['src/seeds/factories/**/*{.ts,.js}'],
    });
    await createConnection(connectionOptions);

    process.on('uncaughtException', async err => {
      winstonLogger.error(`${err.name}: ${err.message}`);
      await getConnection().close();
      process.exit(1);
    });

    process.on('unhandledRejection', (err: Error) => {
      winstonLogger.error(`${err.name}: ${err.message}`);
    });

    startServer(app);
  } catch (err) {
    winstonLogger.error(`${err.name}: ${err.message}`);
  }
}

runApp();
