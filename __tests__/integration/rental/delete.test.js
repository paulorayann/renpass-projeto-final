const request = require('supertest');
const app = require('../../../src/app');
const RentalSchema = require('../../../src/app/schema/RentalSchema');

afterEach(async () => {
  await RentalSchema.deleteMany({ cnpj: '16.777.325/0001-15' });
});

it('should delete a Rental through it Id', async () => {
  const createRentalDelete = await request(app)
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
  const deleteRental = await request(app).delete(`/api/v1/rental/${createRentalDelete.body._id}`).send();

  expect(deleteRental.statusCode).toBe(204);
});

it('should not be able to delete a Rental through nonexistent id', async () => {
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
  const patchRental = await request(app).delete(`/api/v1/rental/${'62b8cd2b5a994c531494b102'}`).send();

  expect(patchRental.statusCode).toBe(404);
});
