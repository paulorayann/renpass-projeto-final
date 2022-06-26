const request = require('supertest');
const Chance = require('chance');
const app = require('../../../src/app');

const chance = new Chance();

it('should update a Person through it Id', async () => {
  const createPerson = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const patchPerson = await request(app).patch(`/api/v1/person/${createPerson.body._id}`).send({
    cpf: chance.cpf(),
    canDrive: 'no'
  });

  expect(patchPerson.statusCode).toBe(200);
});

it('should not be able to update a Person sending a invalid CPF', async () => {
  const createPerson2 = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const patchPerson = await request(app).patch(`/api/v1/person/${createPerson2.body._id}`).send({
    cpf: '111.111.234-21'
  });

  expect(patchPerson.statusCode).toBe(400);
});

it('should not be able to update a Person sending a invalid e-mail', async () => {
  const createPerson3 = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const patchPerson = await request(app).patch(`/api/v1/person/${createPerson3.body._id}`).send({
    email: 'test@asd'
  });

  expect(patchPerson.statusCode).toBe(400);
});

it('should not be able to update a Person sending less than 6 characters password', async () => {
  const createPerson4 = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const patchPerson = await request(app)
    .patch(`/api/v1/person/${createPerson4.body._id}`)
    .send({
      password: chance.string({ length: 5 })
    });

  expect(patchPerson.statusCode).toBe(400);
});
