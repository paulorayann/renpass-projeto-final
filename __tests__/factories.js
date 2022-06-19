const faker = require('faker-br');
const { factory } = require('factory-girl');
const Person = require('../src/app/schema/PersonSchema');

factory.define('Person', Person, {
    name: faker.name.findName(),
    cpf: faker.br.cpf(),
    birthday: '10/05/2001',
    email: faker.internet.email(),
    password: faker.internet.password(),
    canDrive: 'yes'
});

module.exports = factory;
