import fetch from 'node-fetch';
import Redis from 'ioredis';
import { Storage } from '@google-cloud/storage';

import { DEFAULT_REDIS_HOST, DEFAULT_REDIS_PORT, RESOURCES_REDIS_DB, GS_BUCKET_NAME, GS_KEY_FILE_PATH } from '../const';

// 以下はコントローラ読み込み時に単一でインスタンス確保される
const redis = new Redis({
  port: DEFAULT_REDIS_PORT,
  host: DEFAULT_REDIS_HOST,
  db: RESOURCES_REDIS_DB,
});
const bucket = new Storage({
  keyFilename: GS_KEY_FILE_PATH,
}).bucket(GS_BUCKET_NAME);

const CARD_KEY_BASE = 'vcard/ratio20/images/card/';
const HASH_LENGTH = 32;
const HASH_LEGEX = /[0-9a-f]{32}/;

/**
 * vcardサーバから取得したリソースを管理するモデルクラス
 */
export default class Resource {
  /**
   * vcardサーバのリソースファイルを同期する
   * @param strUrl URL文字列
   */
  static async sync(strUrl: string): Promise<string | undefined> {
    const url = new URL(strUrl);
    // URLチェック
    const validDomains = ['c.stat100.ameba.jp', 'stat100.ameba.jp', 'dqx9mbrpz1jhx.cloudfront.net'];
    if (!url || !validDomains.includes(url.hostname) || url.pathname.slice(0, 7) !== '/vcard/') {
      // 無効なURL
      return;
    }
    // オブジェクトキー作成
    const key = url.pathname.length > 0 && url.pathname.slice(0, 1) === '/' ? url.pathname.slice(1) : '';
    if (!key) {
      return;
    }
    // 以下Redis操作
    const target = url.origin + url.pathname;
    if (await redis.exists(key)) {
      return;
    }
    // ここまでは await でIO保持

    // ここから fetch 等するので promise でIOを離す
    fetch(target).then(response => {
      if (!response.ok) {
        throw new Error(response.toString());
      }
      const readable = response.body;
      const obj = bucket.file(key);
      const writable = obj.createWriteStream();

      if (readable && writable) {
        readable.pipe(writable);
        // オブジェクト書き込みが完了した時のみ Redis にキー設定
        redis.set(key, key).then(status => {
          if (status !== 'OK') {
            throw new Error(`Failed to set "${key}". (status: ${status})`);
          }
        });
      }
    });
    return strUrl;
  }

  /**
   * vcardサーバの取得済みリソース一覧のキーパスを一挙取得する
   */
  static async getAll(): Promise<string[]> {
    return (await redis.keys('*')).sort();
  }

  /**
   * vcardサーバの取得済みリソース一覧から、card 画像のハッシュを抜き出して取得する
   * @param subPath card画像で必要なサブパス(空文字でcardそのもの)
   * @param ext     拡張子(空文字の場合はディレクトリを含むすべて)
   */
  static async getCardHash(subPath?: string, ext?: string): Promise<string[]> {
    const relativePath = subPath ?? '';
    const start = CARD_KEY_BASE.length + relativePath.length;

    const keys = await redis.keys(CARD_KEY_BASE + relativePath + '*' + ext);
    return keys
      .filter(key => {
        // このテストが通らない場合はパス文字列が別形式なので対象外
        return HASH_LEGEX.test(key.slice(start, start + HASH_LENGTH));
      })
      .map(key => {
        return key.slice(start, start + HASH_LENGTH);
      })
      .sort();
  }
}
