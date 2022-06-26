const request = require('supertest');
const Chance = require('chance');
const app = require('../../../src/app');

const chance = new Chance();
it('should create a new Person', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  expect(createPerson.statusCode).toBe(201);
});

it('should not be able to create a new Person with empty required fields ', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: '',
    cpf: chance.cpf(),
    email: '',
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  expect(createPerson.statusCode).toBe(400);
});

it('should not be able to create a new Person with invalid CPF', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: '111.222.345-67',
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });

  expect(createPerson.statusCode).toBe(400);
});

it('should not be able to create a new Person with unformatted CPF', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: '111222345-67',
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });

  expect(createPerson.statusCode).toBe(400);
});
it('should not be able to create a new Person with invalid E-mail', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: '111.222.345-67',
    email: 'teste@teste',
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });

  expect(createPerson.statusCode).toBe(400);
});

it('should not be able to create a new Person with invalid canDrive enum value', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'teste'
  });
  expect(createPerson.statusCode).toBe(400);
});

it('should not be able to create a underage new Person', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2005',
    canDrive: 'teste'
  });
  expect(createPerson.statusCode).toBe(400);
});
