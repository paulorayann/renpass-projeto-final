const { Router } = require('express');
const car = require('./car.router');
const person = require('./person.router');
const auth = require('./auth.router');
const rental = require('./rental.router');
const reserve = require('./reserve.router');
const fleet = require('./fleet.router');
const swagger = require('./swagger.router');

module.exports = (server) => {
    server.use((req, res, next) => {
        person(server, new Router());
        car(server, new Router());
        auth(server, new Router());
        rental(server, new Router());
        reserve(server, new Router());
        fleet(server, new Router());
        swagger(server, new Router());
        next();
    });
};
