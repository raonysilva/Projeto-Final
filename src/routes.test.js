import request from 'supertest';
import app from './index.js';

let token;

const validUser = {
  name: 'Valid',
  email: 'valid@email.com',
  password: '123',
};

const invalidUser = {
  name: 'Invalid',
  email: 'invalid@email.com',
  password: '123',
};

async function loadToken() {
  const response = await request(app).post('/signin').send(validUser);

  token = response.body.token;
}

describe('Moniotr App Endpoints', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/users').send(validUser);

      expect(response.statusCode).toBe(201);
    });

    it('should not create a new user with same email', async () => {
      const response = await request(app).post('/users').send(validUser);

      expect(response.statusCode).toBe(500);
    });

    it('should not create a new user without email', async () => {
      const response = await request(app).post('/users').send({});

      expect(response.statusCode).toBe(500);
    });
  });

  describe('POST /signin', () => {
    it('should login a valid user', async () => {
      const response = await request(app).post('/signin').send(validUser);

      expect(response.statusCode).toBe(200);
    });

    it('should not login a invalid user', async () => {
      const response = await request(app).post('/signin').send(invalidUser);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /users', () => {
    it('should not show all users without login', async () => {
      const response = await request(app).get('/users');

      expect(response.statusCode).toBe(401);
    });

    it('should show all users', async () => {
      await loadToken();

      const response = await request(app)
        .get('/users')
        .set('Authorization', 'bearer ' + token);

      expect(response.statusCode).toBe(200);
    });

    it('should list validUser', async () => {
      await loadToken();

      const response = await request(app)
        .get('/users')
        .set('Authorization', 'bearer ' + token);

      const hasValidUser = response.body.some(
        (user) => user.email === validUser.email
      );

      expect(hasValidUser).toBeTruthy();
    });
  });
});