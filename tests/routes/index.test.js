import request from 'supertest';
import express from 'express';
import indexRouter from '../../server/routes/index.js';

const app = express();
app.use('/', indexRouter);

describe('Index Routes', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Welcome",
      status: "API is running",
      version: "1.0.0"
    });
  });
});