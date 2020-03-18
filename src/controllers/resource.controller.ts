import { JsonController, Body, Get, Post, HttpCode } from 'routing-controllers';
import Mailgun from 'mailgun-js';
import pug from 'pug';
import moment from 'moment';
import consola from 'consola';

import Resource from '../models/resource.model';

import '../env';

/**
 * vcardサーバから取得したリソースを管理するルーティングコントローラ
 */
@JsonController()
export class ResourceController {
  @Get('/resources')
  async getAll(): Promise<string[]> {
    return Resource.getAll();
  }

  /**
   * リソースを追加する
   * @param resources リソースの集合（URLの配列）
   */
  @HttpCode(202)
  @Post('/resources')
  async post(
    @Body() resources: { urls: string[] }
  ): Promise<{ status: string }> {
    Promise.all(resources.urls.map(url => Resource.sync(url))).then(syncers => {
      const news = syncers.filter(result => result) as string[];
      if (news.length > 0) {
        this.sendMail(news);
        consola.success(moment().format(), news);
      }
    });
    return { status: 'OK' };
  }

  /**
   * リソース一覧からカード画像のハッシュ一覧を取得する
   */
  @Get('/resources/card')
  async getCardHash(): Promise<string[]> {
    return Resource.getCardHash('', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/animation 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/animation')
  async getCardAnimationHash(): Promise<string[]> {
    return Resource.getCardHash('animation/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/battle 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/battle')
  async getCardBattleHash(): Promise<string[]> {
    return Resource.getCardHash('battle/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/collection 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/collection')
  async getCardCollectionHash(): Promise<string[]> {
    return Resource.getCardHash('collection/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/gif 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/cardh/gif')
  async getCardGifHash(): Promise<string[]> {
    return Resource.getCardHash('gif/', '.gif');
  }

  /**
   * リソース一覧からカード画像の card/gif/frame 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/gif/frame')
  async getCardGifFrameHash(): Promise<string[]> {
    return Resource.getCardHash('gif/frame/', '.png');
  }

  /**
   * リソース一覧からカード画像の card/gif/320 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/gif/320')
  async getCardGif320Hash(): Promise<string[]> {
    return Resource.getCardHash('gif/320/', '.gif');
  }

  /**
   * リソース一覧からカード画像の card/icon 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/icon')
  async getCardIconHash(): Promise<string[]> {
    return Resource.getCardHash('icon/', '.png');
  }

  /**
   * リソース一覧からカード画像の card/icon/collection 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/icon/collection')
  async getCardIconCollectionHash(): Promise<string[]> {
    return Resource.getCardHash('icon/collection', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/list 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/list')
  async getCardListHash(): Promise<string[]> {
    return Resource.getCardHash('list/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/mid 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/list')
  async getCardMidHash(): Promise<string[]> {
    return Resource.getCardHash('mid/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/mypage 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/mypage')
  async getCardMypageHash(): Promise<string[]> {
    return Resource.getCardHash('mypage/', '.jpg'); // TODO: 実はmypageは .jpg と.png の両方ある
  }

  /**
   * リソース一覧からカード画像の card/mypage/off 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/mypage/off')
  async getCardMypageOffHash(): Promise<string[]> {
    return Resource.getCardHash('mypage/off/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/off 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/off')
  async getCardOffHash(): Promise<string[]> {
    return Resource.getCardHash('off/', '.png'); // TODO: 実はoffは .jpg と.png の両方ある
  }

  /**
   * リソース一覧からカード画像の card/offeffect/320x400 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/offeffect')
  async getCardOffeffectHash(): Promise<string[]> {
    return Resource.getCardHash('offeffect/320x400/', '.png');
  }

  /**
   * リソース一覧からカード画像の card/profile 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/profile')
  async getCardProfileHash(): Promise<string[]> {
    return Resource.getCardHash('profile/', '.jpg');
  }

  /**
   * リソース一覧からカード画像の card/profile/off 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/profile/off')
  async getCardProfileOffHash(): Promise<string[]> {
    return Resource.getCardHash('profile/off/', '.png');
  }

  /**
   * リソース一覧からカード画像の card/shininggirl-new/320x400 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/shininggirl-new')
  async getCardShininggirlNewHash(): Promise<string[]> {
    return Resource.getCardHash('shininggirl-new/320x400/'); // キラガールはディレクトリ
  }

  /**
   * リソース一覧からカード画像の card/shininggirl/320x400 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/shininggirl')
  async getCardShininggirlHash(): Promise<string[]> {
    return Resource.getCardHash('shininggirl/320x400/'); // キラガールはディレクトリ
  }

  /**
   * リソース一覧からカード画像の card/ssr_sample 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/ssr_sample')
  async getCardSsrSampleHash(): Promise<string[]> {
    return Resource.getCardHash('ssr_sample/', '.mp4');
  }

  /**
   * リソース一覧からカード画像の card/ssr_sample/poster 以下にあるハッシュ一覧を取得する
   */
  @Get('/resources/card/ssr_sample/poster')
  async getCardSsrSamplePosterHash(): Promise<string[]> {
    return Resource.getCardHash('ssr_sample/poster/', '.png');
  }

  /* --------------------------- private --------------------------- */
  /**
   * 追加されたURLのメールをMailgunで送る
   * @param adds 追加されたURL一覧
   */
  private sendMail(adds: string[]): void {
    if (adds && adds.length > 0) {
      const apiKey = process.env.NODE_MAILGUN_APIKEY || '';
      const domain = process.env.NODE_MAILGUN_DOMAIN || '';
      const mailfromto = process.env.NODE_MAIL_FROM_TO || '';

      const mailgun = new Mailgun({ apiKey: apiKey, domain: domain });
      const bodypug = pug.compileFile(
        process.env.NODE_RESOURCE_MAIL_PUG_PATH || ''
      );

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
