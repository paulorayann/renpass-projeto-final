const CarController = require('../app/controllers/CarController');
const validateCar = require('../app/validations/car/validateCar');
const validateCarUpdate = require('../app/validations/car/validateCarUpdate');
const authToken = require('../app/middlewares/authToken');
const validateId = require('../app/validations/validateId');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.use(authToken);
    routes.post('/', validateCar, CarController.create);
    routes.get('/', CarController.list);
    routes.get('/:id', validateId, CarController.getById);
    routes.patch('/:id', validateId, validateCarUpdate, CarController.update);
    routes.patch(
        '/:id/accessories/:accessoryId',
        CarController.updateCarAccessory
    );
    routes.delete('/:id', validateId, CarController.delete);

    server.use(prefix, routes);
};
