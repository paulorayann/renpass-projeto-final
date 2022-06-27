const ReserveController = require('../app/controllers/ReserveController');
const validateReserve = require('../app/validations/reserve/validateReserve');
const validateReserveUpdate = require('../app/validations/reserve/validateReserveUpdate');
const validateReserveGet = require('../app/validations/reserve/validateReserveGet');
const validateIdReserve = require('../app/validations/reserve/validateIdReserve');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:rentalId/reserve', validateIdReserve, validateReserve, ReserveController.create);
  routes.get('/:rentalId/reserve', validateIdReserve, validateReserveGet, ReserveController.list);
  routes.get('/:rentalId/reserve/:id', validateIdReserve, validateReserveGet, ReserveController.getById);
  routes.patch('/:rentalId/reserve/:id', validateIdReserve, validateReserveUpdate, ReserveController.update);
  routes.delete('/:rentalId/reserve/:id', validateIdReserve, ReserveController.delete);

  server.use(prefix, routes);
};
