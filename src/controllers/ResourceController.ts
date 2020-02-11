/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { JsonController, Param, Body, Get, Post } from 'routing-controllers';
// https://github.com/typestack/routing-controllers
// https://github.com/epiphone/routing-controllers-openapi

import Redis from 'ioredis';
// https://github.com/luin/ioredis
// https://github.com/luin/ioredis/blob/master/API.md
// https://qiita.com/jnst/items/a4b1f4559dbbd4665512

@JsonController()
export class ResourceController {
  @Get('/resources')
  getAll() {
    return 'This action returns all users';
  }

  @Get('/resources/:path')
  getOne(@Param('path') path: string) {
    return 'This action returns user /' + path;
  }

  @Post('/resources')
  post(@Body() user: any) {
    console.log(user);
    return 'Saving user...';
  }
}
