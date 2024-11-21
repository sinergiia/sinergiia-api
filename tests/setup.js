import { db } from '../server/config/database.js';

beforeAll(async () => {
  // Clear test database
  await db.execute('DELETE FROM leads');
  await db.execute('DELETE FROM blog_posts');
  
  // Insert test data
  await db.execute(`
    INSERT INTO blog_posts (title, content, image_url, seo_title, seo_description) 
    VALUES (
      'Test Post',
      'Test Content',
      'https://example.com/image.jpg',
      'Test SEO Title',
      'Test SEO Description'
    )
  `);
});