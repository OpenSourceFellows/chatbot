const request = require('supertest');
const app = require('../server');

describe('Basic Server Tests', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /chatbot/health', () => {
    it('should return chatbot health status', async () => {
      const response = await request(app)
        .get('/chatbot/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /messaging', () => {
    it('should return messaging service status', async () => {
      const response = await request(app)
        .get('/messaging')
        .expect(200);

      expect(response.body).toContain('📨 Messaging API is working');
    });
  });

  describe('GET /edx/courses', () => {
    it('should return courses list', async () => {
      const response = await request(app)
        .get('/edx/courses')
        .expect(200);

      expect(response.body).toHaveProperty('courses');
      expect(Array.isArray(response.body.courses)).toBe(true);
    });
  });

  describe('GET /auth/login', () => {
    it('should return login message', async () => {
      const response = await request(app)
        .get('/auth/login')
        .expect(200);

      expect(response.text).toContain('Login API is working');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Not found');
    });
  });
});
