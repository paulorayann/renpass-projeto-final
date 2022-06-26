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

it('should update a Car through it Id', async () => {
  const createCar = await request(app)
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
  const patchCar = await request(app)
    .patch(`/api/v1/car/${createCar.body._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      model: 'Voyage',
      type: 'Sedan',
      brand: 'Volkswagem'
    });

  expect(patchCar.statusCode).toBe(200);
});

it('should not be able to update a Car because it should have passengers limit of at least 2', async () => {
  const createCar2 = await request(app)
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

  const patchCar = await request(app)
    .patch(`/api/v1/car/${createCar2.body._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      passengersQtd: 1
    });

  expect(patchCar.statusCode).toBe(400);
});

it('should not be able to update a Car because the year must be between 1950 and 2022', async () => {
  const createCar3 = await request(app)
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

  const patchCar = await request(app)
    .patch(`/api/v1/car/${createCar3.body._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      year: '1949'
    });

  expect(patchCar.statusCode).toBe(400);
});
