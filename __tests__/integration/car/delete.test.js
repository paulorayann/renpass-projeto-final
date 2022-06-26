const request = require('supertest');
const Chance = require('chance');
const app = require('../../../src/app');

let token = '';
const chance = new Chance();

beforeEach(async () => {
  await request(app).post('/api/v1/person').send({
    name: chance.name(),
    cpf: chance.cpf(),
    email: 'authtest@auth.com',
    password: '123456789',
    birthDay: '09/05/2002',
    canDrive: 'yes'
  });

  const auth = await request(app)
    .post('/api/v1/authenticate')
    .send({ email: 'authtest@auth.com', password: '123456789' });

  token = auth.body.token;
});

it('should delete a Car through it Id', async () => {
  const createCarDelete = await request(app)
    .post('/api/v1/car')
    .set('Authorization', `Bearer ${token}`)
    .send({
      model: 'Celta',
      type: 'Hatch',
      brand: 'Chevrolet',
      color: 'Vermelho',
      year: '2010',
      accessories: [
        {
          description: 'Ar-condicionado'
        },
        {
          description: 'Cambio Manual'
        }
      ],
      passengersQtd: 5
    });
  const deleteCar = await request(app)
    .delete(`/api/v1/car/${createCarDelete.body._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send();

  expect(deleteCar.statusCode).toBe(204);
});

it('should not be able todelete a Car through nonexistent id', async () => {
  await request(app)
    .post('/api/v1/car')
    .set('Authorization', `Bearer ${token}`)
    .send({
      model: 'Celta',
      type: 'Hatch',
      brand: 'Chevrolet',
      color: 'Vermelho',
      year: '2010',
      accessories: [
        {
          description: 'Ar-condicionado'
        },
        {
          description: 'Cambio Manual'
        }
      ],
      passengersQtd: 5
    });
  const deleteCar = await request(app)
    .delete(`/api/v1/car/${'62b8cd2b5a994c531494b102'}`)
    .set('Authorization', `Bearer ${token}`)
    .send();

  expect(deleteCar.statusCode).toBe(404);
});
