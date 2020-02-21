/* eslint-disable @typescript-eslint/explicit-function-return-type */
// https://qiita.com/yuukive/items/331aa21654bb8b20a34d
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';

@JsonController()
export class UserController {
  @Get('/users')
  getAll() {
    return { test: 'moge' };
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('/users')
  post(@Body() user: any) {
    console.log(user);
    return 'Saving user...';
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    console.log(user);
    return 'Updating a user #' + id;
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user #' + id;
  }
}
