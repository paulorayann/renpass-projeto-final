const request = require('supertest');
const app = require('../../../src/app');
const RentalSchema = require('../../../src/app/schema/RentalSchema');

beforeEach(async () => {
  await RentalSchema.deleteMany({ cnpj: '16.777.325/0001-15' });
});

it('should create a new Rental', async () => {
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

  expect(createRental.statusCode).toBe(201);
});

it('should not be able to create a new Rental with empty required fields ', async () => {
  const createRental2 = await request(app)
    .post('/api/v1/rental')
    .send({
      name: '',
      cnpj: '',
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
  expect(createRental2.statusCode).toBe(400);
});

it('should not be able to create a new Rental with invalid CNPJ', async () => {
  const createRental3 = await request(app)
    .post('/api/v1/rental')
    .send({
      name: 'Name Example',
      cnpj: '12.456.565/0001-63',
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

  expect(createRental3.statusCode).toBe(400);
});

it('should not be able to create a new Rental with unformatted CNPJ', async () => {
  const createRental4 = await request(app)
    .post('/api/v1/rental')
    .send({
      name: 'Name Example',
      cnpj: '314125565/0000-63',
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

  expect(createRental4.statusCode).toBe(400);
});

it('should not be able to create a new Rental with invalid zipCode', async () => {
  const createRental5 = await request(app)
    .post('/api/v1/rental')
    .send({
      name: 'Name Example',
      cnpj: '12.456.565/0001-63',
      activities: 'Aluguel de Carros E Gestao de Frotas',
      address: [
        {
          zipCode: '1113-000',
          number: '180',
          isFilial: true
        },
        {
          zipCode: '12345-310',
          number: '180',
          isFilial: false
        }
      ]
    });
  expect(createRental5.statusCode).toBe(400);
});
