import 'reflect-metadata';

import Koa from 'koa';
import { createKoaServer } from 'routing-controllers';
// import logger from 'koa-logger';
import cors from '@koa/cors';

// import { UserController } from './controllers/user.controller';
import { ResourceController } from './controllers/resource.controller';

const app = createKoaServer({
  controllers: [ResourceController],
  routePrefix: process.env.NODE_KOA_ROUTE_PREFIX || '',
}) as Koa;

// app.use(logger());
app.use(cors());

export = app;
