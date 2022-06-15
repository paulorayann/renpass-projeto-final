const CarController = require('../app/controllers/CarController');
const validateCar = require('../app/validations/car/validateCar');
const validateCarUpdate = require('../app/validations/car/validateCarUpdate');
const authToken = require('../app/middlewares/authToken');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.use(authToken);
    routes.post('/', validateCar, CarController.create);
    routes.get('/', CarController.list);
    routes.get('/:id', CarController.getById);
    routes.patch('/:id', validateCarUpdate, CarController.update);
    routes.patch(
        '/:id/accessories/:accessoryId',
        CarController.updateCarAccessory
    );
    routes.delete('/:id', CarController.delete);

    server.use(prefix, routes);
};
