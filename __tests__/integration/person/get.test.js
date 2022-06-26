const request = require('supertest');
const Chance = require('chance');
const app = require('../../../src/app');
// const Person = require('../../../src/app/schema/PersonSchema');

const chance = new Chance();

it('should get all Person', async () => {
  const listPerson = await request(app).get('/api/v1/person').send();

  expect(listPerson.statusCode).toBe(200);
});

it('should get body with no property', async () => {
  const { listPerson } = await request(app).get('/api/v1/person').send({
    _id: '62b0c1d0265111e89201d544'
  });

  expect(listPerson).toBeUndefined();
});

it('should get person by Id', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const listPerson = await request(app).get(`/api/v1/person/${createPerson.body._id}`).send();

  expect(listPerson.statusCode).toBe(200);
});

it('should not be able to get person by wrong id format', async () => {
  await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const listPerson = await request(app).get(`/api/v1/person/${'62b8cd2b5a994c531494b102'}`).send();

  expect(listPerson.statusCode).toBe(404);
});
