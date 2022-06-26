const request = require('supertest');
const Chance = require('chance');
const app = require('../../../src/app');

const chance = new Chance();
it('should authenticate person', async () => {
  await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: 'authtest@auth.com',
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });

  const authenticate = await request(app).post('/api/v1/authenticate').send({
    email: 'authtest@auth.com',
    password: '123456789'
  });
  expect(authenticate.statusCode).toBe(200);
  console.log(authenticate);
});

it('should return a token value for the authentication', async () => {
  const authenticate2 = await request(app).post('/api/v1/authenticate').send({
    email: 'authtest@auth.com',
    password: '123456789'
  });
  expect(authenticate2.body).toHaveProperty('token');
});

it('should not be able to authenticate person with invalid credentials', async () => {
  const authenticate = await request(app).post('/api/v1/authenticate').send({
    email: 'wrongcredentials@auth.com',
    password: '123456789'
  });
  expect(authenticate.statusCode).toBe(401);
});
