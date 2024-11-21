import request from 'supertest';
import express from 'express';
import blogRouter from '../../server/routes/blog.js';

const app = express();
app.use(express.json());
app.use('/api/blog', blogRouter);

const validToken = process.env.ADMIN_TOKEN || 'test-token';

describe('Blog Routes', () => {
  test('GET /api/blog should return all blog posts', async () => {
    const response = await request(app).get('/api/blog');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/blog/:id should return specific blog post', async () => {
    const response = await request(app).get('/api/blog/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });

  test('POST /api/blog without token should fail', async () => {
    const response = await request(app)
      .post('/api/blog')
      .send({
        title: 'New Post',
        content: 'Content',
        seoTitle: 'SEO Title',
        seoDescription: 'SEO Description'
      });
    
    expect(response.status).toBe(401);
  });

  test('POST /api/blog with valid token should succeed', async () => {
    const response = await request(app)
      .post('/api/blog')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        title: 'New Post',
        content: 'Content',
        seoTitle: 'SEO Title',
        seoDescription: 'SEO Description'
      });
    
    expect(response.status).toBe(201);
  });
});