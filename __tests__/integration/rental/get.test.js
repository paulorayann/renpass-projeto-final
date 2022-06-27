const request = require('supertest');
const app = require('../../../src/app');
const RentalSchema = require('../../../src/app/schema/RentalSchema');

afterEach(async () => {
  await RentalSchema.deleteMany({ cnpj: '16.777.325/0001-15' });
});

it('should get all Person', async () => {
  const listRental = await request(app).get('/api/v1/rental').send();
  expect(listRental.statusCode).toBe(200);
});

it('should get a Rental through it Id', async () => {
  const createRental = await request(app)
    .post('/api/v1/rental')
    .send({
      name: 'Name Example',
      cnpj: '16.777.325/0001-15',
      activities: 'Aluguel de Carros E Gestao de Frotas',
      address: [
        {
          zipCode: '01001-000',
          number: '180',
          isFilial: true
        },
        {
          zipCode: '68926-310',
          number: '180',
          isFilial: false
        }
      ]
    });
  const listRental = await request(app).get(`/api/v1/rental/${createRental.body._id}`).send();

  expect(listRental.statusCode).toBe(200);
});

it('should not be able to get a Rental with nonexistent id', async () => {
  await request(app)
    .post('/api/v1/rental')
    .send({
      name: 'Name Example',
      cnpj: '16.777.325/0001-15',
      activities: 'Aluguel de Carros E Gestao de Frotas',
      address: [
        {
          zipCode: '01001-000',
          number: '180',
          isFilial: true
        },
        {
          zipCode: '68926-310',
          number: '180',
          isFilial: false
        }
      ]
    });
  const listRental = await request(app).get(`/api/v1/rental/${'62b8cd2b5a994c531494b102'}`).send();

  expect(listRental.statusCode).toBe(404);
});
