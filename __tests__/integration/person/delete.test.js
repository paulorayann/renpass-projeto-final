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
  const deletePerson = await request(app).delete(`/api/v1/person/${createPersonDelete.body._id}`).send();

  expect(deletePerson.statusCode).toBe(204);
});

it('should not be able to delete a Person through nonexistent id', async () => {
  await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: chance.email(),
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });
  const deletePerson = await request(app).delete(`/api/v1/person/${'62b8cd2b5a994c531494b102'}`).send();

  expect(deletePerson.statusCode).toBe(404);
});
