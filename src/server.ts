import 'reflect-metadata';

import Koa from 'koa';
import { createKoaServer } from 'routing-controllers';
import logger from 'koa-logger';

import { DEFAULT_LISTEN_PORT, DEFAULT_ROUTE_PREFIX } from './const';
import { UserController } from './controllers/user.controller';
import { ResourceController } from './controllers/resource.controller';

const app = createKoaServer({
  controllers: [UserController, ResourceController],
  routePrefix: DEFAULT_ROUTE_PREFIX,
}) as Koa;

app.use(logger());

app.listen(DEFAULT_LISTEN_PORT);
