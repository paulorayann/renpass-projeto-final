const { Router } = require('express');
const car = require('./car.router');
const person = require('./person.router');
const auth = require('./auth.router');
const rental = require('./rental.router');

module.exports = (server) => {
    server.use((req, res, next) => {
        person(server, new Router());
        car(server, new Router());
        auth(server, new Router());
        rental(server, new Router());
        next();
    });
};
