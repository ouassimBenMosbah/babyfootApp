import supertest from 'supertest';
import mongoose from 'mongoose';
import app from './app';

describe('Testing the server connection', () => {
  beforeAll(() => {
    app.listen(8080);
  });

  afterAll(async () => {
    await app.close();
    await mongoose.connection.close();
    await mongoose.disconnect();
  });

  test('server is listening on port 8080', async () => {
    const response = await supertest(app).get('/');
    expect(response).toBe(200);
  });
});
