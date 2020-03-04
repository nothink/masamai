import 'reflect-metadata';

import Koa from 'koa';
import { createKoaServer } from 'routing-controllers';
import logger from 'koa-logger';

import { UserController } from './controllers/user.controller';
import { ResourceController } from './controllers/resource.controller';
import './env';

const app = createKoaServer({
  controllers: [UserController, ResourceController],
  routePrefix: process.env.NODE_KOA_ROUTE_PREFIX,
}) as Koa;

app.use(logger());

app.listen(parseInt(process.env.NODE_KOA_LISTEN_PORT as string));
