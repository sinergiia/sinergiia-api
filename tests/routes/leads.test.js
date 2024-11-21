import request from 'supertest';
import express from 'express';
import leadsRouter from '../../server/routes/leads.js';

const app = express();
app.use(express.json());
app.use('/api/leads', leadsRouter);

describe('Leads Routes', () => {
  test('POST /api/leads with valid data should succeed', async () => {
    const response = await request(app)
      .post('/api/leads')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+34600000000',
        message: 'Test message'
      });
    
    expect(response.status).toBe(201);
  });

  test('POST /api/leads with missing data should fail', async () => {
    const response = await request(app)
      .post('/api/leads')
      .send({
        name: 'Test User',
        email: 'test@example.com'
      });
    
    expect(response.status).toBe(400);
  });
});