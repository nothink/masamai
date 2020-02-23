/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { JsonController, Body, Get, Post, HttpCode } from 'routing-controllers';
import Mailgun from 'mailgun-js';
import pug from 'pug';

import Resource from '../models/resource.model';

import '../env';
import { RESOURCE_MAIL_PUG_PATH } from '../const';

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
    this.sendMail(news);
    return news;
  }

  sendMail(adds: string[]) {
    if (adds && adds.length > 0) {
      const apiKey = process.env.NODE_MAILGUN_APIKEY as string;
      const domain = process.env.NODE_MAILGUN_DOMAIN as string;
      const mailfromto = process.env.NODE_MAIL_FROM_TO as string;

      const mailgun = new Mailgun({ apiKey: apiKey, domain: domain });
      const bodypug = pug.compileFile(RESOURCE_MAIL_PUG_PATH);

      mailgun.messages().send({
        from: mailfromto,
        to: mailfromto,
        subject: 'MASAMAI update.',
        html: bodypug({ urls: adds, datetime: new Date() }),
      });
    }
    return;
  }
}
