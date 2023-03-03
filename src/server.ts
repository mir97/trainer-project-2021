import express from 'express';
import routerUsers from './routers/users.router';
import routerGroups from './routers/groups.router';
import routerAuth from './routers/auth.router';
import { internalServerErrorLogger } from './loggers/winston.loggers';
import morgan from 'morgan';
import { ExpressWithAsync } from '@awaitjs/express';
import { authMiddleware } from './middlewares/auth.middlewares';
import cors from 'cors';
import dotenv from 'dotenv';

export function startServer(app: ExpressWithAsync): void {
  const dotenvResult = dotenv.config();
  if (dotenvResult.error) {
    throw dotenvResult.error;
  }
  const PORT = process.env.PORT;
  app.useAsync(cors());
  app.useAsync(express.json());
  app.useAsync(morgan(':custom'));
  app.useAsync(routerAuth);
  app.useAsync(authMiddleware);
  app.useAsync(routerGroups);
  app.useAsync(routerUsers);
  app.useAsync(internalServerErrorLogger);
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}...\n`));
}
