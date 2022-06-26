const CarController = require('../app/controllers/CarController');
const validateCar = require('../app/validations/car/validateCar');
const validateCarUpdate = require('../app/validations/car/validateCarUpdate');
const validateCarGet = require('../app/validations/car/validateCarGet');
const validateAccessoryUpdate = require('../app/validations/car/validateAccessoryUpdate');
const validateId = require('../app/validations/validateId');
const authToken = require('../app/middlewares/authToken');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.use(authToken);
  routes.post('/', validateCar, CarController.create);
  routes.get('/', validateCarGet, CarController.list);
  routes.get('/:id', validateId, validateCarGet, CarController.getById);
  routes.patch('/:id', validateId, validateCarUpdate, CarController.update);
  routes.patch('/:id/accessories/:accessoryId', validateAccessoryUpdate, CarController.updateCarAccessory);
  routes.delete('/:id', validateId, CarController.delete);

  server.use(prefix, routes);
};
