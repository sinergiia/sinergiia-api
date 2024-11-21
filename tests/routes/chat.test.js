import request from 'supertest';
import express from 'express';
import chatRouter from '../../server/routes/chat.js';

const app = express();
app.use(express.json());
app.use('/api/chat', chatRouter);

describe('Chat Routes', () => {
  test('POST /api/chat should handle messages', async () => {
    // Skip if OpenAI API key not configured
    if (!process.env.OPENAI_API_KEY) {
      return;
    }

    const response = await request(app)
      .post('/api/chat')
      .send({
        message: 'Hello'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('response');
  });

  test('POST /api/chat without API key should return service unavailable', async () => {
    // Only run if OpenAI API key not configured
    if (process.env.OPENAI_API_KEY) {
      return;
    }

    const response = await request(app)
      .post('/api/chat')
      .send({
        message: 'Hello'
      });
    
    expect(response.status).toBe(503);
  });
});