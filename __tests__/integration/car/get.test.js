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

it('should get all Cars', async () => {
  const getCar = await request(app).get('/api/v1/car').set('Authorization', `Bearer ${token}`).send();
  expect(getCar.statusCode).toBe(200);
});

it('should get Car by Id', async () => {
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
    .get(`/api/v1/car/${createCar.body._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send();

  expect(patchCar.statusCode).toBe(200);
});

it('should not be able to get Car by wrong Id', async () => {
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
  const patchCar = await request(app)
    .get(`/api/v1/car/${'62b8cd2b5a994c531494b102'}`)
    .set('Authorization', `Bearer ${token}`)
    .send();

  expect(patchCar.statusCode).toBe(404);
});
