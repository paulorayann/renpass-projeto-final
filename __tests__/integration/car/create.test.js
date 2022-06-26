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

it('should create a new car', async () => {
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
  expect(createCar.statusCode).toBe(201);
});

it('should not be able to create a new Car with empty required fields', async () => {
  const createCar = await request(app)
    .post('/api/v1/car')
    .set('Authorization', `Bearer ${token}`)
    .send({
      type: 'Hatch',
      brand: 'Chevrolet',
      year: '2010',
      accessories: [
        {
          description: 'Ar-condicionado'
        },
        {
          description: 'Cambio Manual'
        }
      ]
    });
  expect(createCar.statusCode).toBe(400);
});

it('should not be able to create a new Car because it should have at least one accessory', async () => {
  const createCar = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send({
    model: 'Celta',
    type: 'Hatch',
    brand: 'Chevrolet',
    color: 'Vermelho',
    year: '2010',
    accessories: [],
    passengersQtd: 5
  });
  expect(createCar.statusCode).toBe(400);
});

it('should not be able to create a new Car because it should have passengers limit of at least 2', async () => {
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
      passengersQtd: 1
    });
  expect(createCar.statusCode).toBe(400);
});
