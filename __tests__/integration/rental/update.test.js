const request = require('supertest');
const app = require('../../../src/app');
const RentalSchema = require('../../../src/app/schema/RentalSchema');

afterEach(async () => {
  await RentalSchema.deleteMany({ cnpj: '16.777.325/0001-15' });
});

it('should update a Rental through it Id', async () => {
  const createRentalUp = await request(app)
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
  const patchRental = await request(app).patch(`/api/v1/rental/${createRentalUp.body._id}`).send({
    name: 'Name for test',
    activities: 'Feature Test'
  });

  expect(patchRental.statusCode).toBe(200);
});

it('should not be able to update a Rental with invalid CNPJ', async () => {
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
  const patchRental = await request(app).patch(`/api/v1/rental/${createRental.body._id}`).send({
    cnpj: '314125565/0000-63'
  });

  expect(patchRental.statusCode).toBe(400);
});

it('should not be able to update a Rental with nonexistent id', async () => {
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
  const patchRental = await request(app).patch(`/api/v1/rental/${'62b8cd2b5a994c531494b102'}`).send({
    activities: 'Invalid ID test'
  });

  expect(patchRental.statusCode).toBe(404);
});
