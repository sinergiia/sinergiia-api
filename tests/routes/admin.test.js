import request from 'supertest';
import express from 'express';
import adminRouter from '../../server/routes/admin.js';

const app = express();
app.use(express.json());
app.use('/api/admin', adminRouter);

describe('Admin Routes', () => {
  test('POST /api/admin/login with valid password should return token', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({
        password: process.env.ADMIN_PASSWORD || 'test-password'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/admin/login with invalid password should fail', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({
        password: 'wrong-password'
      });
    
    expect(response.status).toBe(401);
  });
});