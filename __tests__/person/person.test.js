const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Person Feature tests', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return status code 201', () => {
    factory.create('Person', {});

    const { status } = request(app).post('/api/v1/person').send(factory);

    expect(status).toBe(201);
  });
});
