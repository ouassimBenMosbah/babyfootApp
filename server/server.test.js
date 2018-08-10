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

  test('server should respond 200 when getting /', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  test('server should respond 200 with a body containing a username and a password', async () => {
    const response = await supertest(app).post('/')
      .type('form')
      .send({ username: 'salut', password: 'test' });
    expect(response.body).toBe({ username: 'salut', password: 'test' });
    expect(response.status).toBe(302);
  });
});
