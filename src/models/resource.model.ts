import fetch from 'node-fetch';
import Redis from 'ioredis';
import crypto from 'crypto';
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

export default class Resource {
  public url!: URL;

  /**
   * vcardサーバのリソースファイルを同期する
   * @param strUrl URL文字列
   */
  static async sync(strUrl: string): Promise<string | undefined> {
    const url = new URL(strUrl);
    // URLチェック
    if (
      !url ||
      !['c.stat100.ameba.jp', 'stat100.ameba.jp', 'dqx9mbrpz1jhx.cloudfront.net'].includes(url.hostname) ||
      url.pathname.slice(0, 7) !== '/vcard/'
    ) {
      return;
    }
    // オブジェクトキー作成
    const key = url.pathname.length > 0 && url.pathname.slice(0, 1) === '/' ? url.pathname.slice(1) : '';
    if (!key) {
      return;
    }
    // オブジェクトキーのハッシュ作成
    const hashed = crypto
      .createHash('sha256')
      .update(key, 'utf8')
      .digest('hex');
    // 以下Redis操作など
    const target = url.origin + url.pathname;
    const current = await redis.get(hashed);
    if (current && current === key) {
      return;
    }
    // ここまでは await

    // ここからはpromiseでIOを離す
    fetch(target).then(response => {
      if (!response.ok) {
        throw new Error(response.toString());
      }
      const readable = response.body;
      const obj = bucket.file(key);
      const writable = obj.createWriteStream();

      if (readable && writable) {
        readable.pipe(writable);
        redis.set(hashed, key).then(status => {
          if (status !== 'OK') {
            throw new Error(`Failed to set {"${hashed}": "${key}"}. (status: ${status})`);
          }
        });
      }
    });
    return strUrl;
  }

  /**
   * vcardサーバの取得済みリソース一覧のキーパスを一挙取得する
   */
  static async get(): Promise<string[]> {
    const keys = await redis.keys('*');
    const values: string[] = [];
    for (const key of keys) {
      const value = await redis.get(key);
      if (value) {
        values.push(value);
      }
    }
    return values;
  }
}
