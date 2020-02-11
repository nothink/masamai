import 'reflect-metadata';

import Koa from 'koa';
import { createKoaServer } from 'routing-controllers';
import logger from 'koa-logger';

import { DEFAULT_LISTEN_PORT } from './const';
import { UserController } from './controllers/UserController';

const app = createKoaServer({
  controllers: [UserController],
}) as Koa;

app.use(logger());

app.listen(DEFAULT_LISTEN_PORT);
