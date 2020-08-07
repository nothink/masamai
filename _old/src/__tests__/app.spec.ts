import request from 'supertest';

import app from '../app';

describe('App standalone tests.', () => {
  test('Top request = 404', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).toBe(404);
  });
});
