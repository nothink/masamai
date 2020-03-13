import 'reflect-metadata';

// TODO: Resourceモデル用モック作る
// import Redis from 'ioredis-mock';
// import * as request from 'supertest';

import '../../env';
import app from '../../app';

describe('routes of Resource', () => {
  // process.envでの分岐を反映するためのバックアップ
  const OLD_ENV = process.env;

  beforeAll(async () => {
    process.env = { ...OLD_ENV };
    // このテストでの対象となる環境変数
    delete process.env.NODE_REDIS_PORT;
    delete process.env.NODE_REDIS_HOST;
    delete process.env.NODE_REDIS_RESOURCES_DB;
    delete process.env.NODE_REDIS_RESOURCES_FAILED_DB;
    delete process.env.NODE_GS_KEY_FILE_PATH;
    delete process.env.NODE_GS_BUCKET_NAME;
    // TODO: Resourceモデルのモックをセットする方法を調べる
  });

  afterAll(async () => {
    // TODO: ここでモックをリセット
    process.env = OLD_ENV;
  });

  test('get all using /resources', async done => {
    // TODO: モック作る
    // const redis = new Redis({
    //   data: { data01: 'data01', data02: 'data02' },
    // });

    // TODO: とりあえずのダミー
    // テストコード例: https://github.com/typestack/routing-controllers/issues/400
    expect(app).not.toBeNull();
    done();
  });
});
