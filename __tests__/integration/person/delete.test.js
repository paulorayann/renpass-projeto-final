const request = require('supertest');
const Chance = require('chance');
const app = require('../../../src/app');

const chance = new Chance();

it('should delete a Person through it Id', async () => {
  const createPersonDelete = await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const patchPerson = await request(app).delete(`/api/v1/person/${createPersonDelete.body._id}`).send();

  expect(patchPerson.statusCode).toBe(204);
});
