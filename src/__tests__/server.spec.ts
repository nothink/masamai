import app from '../app';

describe('Server mock tests.', () => {
  const mockListen = jest.fn();
  app.listen = mockListen;

  // process.envでの分岐を反映するためのバックアップ
  const OLD_ENV = process.env;

  beforeEach(() => {
    // TODO: resetModule() したら呼ばれなくなる？
    // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
    // jest.resetModules();
    process.env = { ...OLD_ENV };
    // このテストでの対象となる環境変数
    delete process.env.NODE_KOA_LISTEN_PORT;
  });

  afterEach(() => {
    mockListen.mockReset();
    process.env = OLD_ENV;
  });

  test('Server works using default port', async () => {
    require('../server');

    expect(mockListen.mock.calls.length).toBe(1);
    expect(mockListen.mock.calls[0][0]).toBe(3000);
  });
});
