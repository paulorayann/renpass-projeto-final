const CarController = require('../app/controllers/CarController');
const validateCar = require('../app/validations/car/validateCar');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', validateCar, CarController.create);
    routes.get('/', CarController.list);
    routes.get('/:id', CarController.getById);
    routes.patch('/:id', validateCar, CarController.update);
    routes.delete('/:id', CarController.delete);

    server.use(prefix, routes);
};
