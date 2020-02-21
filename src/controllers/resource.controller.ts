/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { JsonController, Body, Get, Post, HttpCode } from 'routing-controllers';
import Mailgun from 'mailgun-js';

import Resource from '../models/resource.model';

@JsonController()
export class ResourceController {
  @Get('/resources')
  async getAll(): Promise<string[]> {
    return await Resource.get();
  }

  /**
   * リソースを追加する
   * @param resources リソースの集合（URLの配列）
   */
  @HttpCode(202)
  @Post('/resources')
  async post(@Body() resources: string[]): Promise<string[]> {
    const news: string[] = [];
    for (const resource of resources) {
      const result = await Resource.sync(resource);
      if (result) {
        news.push(result as string);
      }
    }
    return news;
  }

  sendMail() {
    const mailgun = new Mailgun({ apiKey: '', domain: '' });
    // TODO: 未実装
    mailgun.messages();
    return;
  }
}
