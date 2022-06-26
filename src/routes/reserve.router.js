const ReserveController = require('../app/controllers/ReserveController');
const validateReserve = require('../app/validations/reserve/validateReserve');
const validateReserveUpdate = require('../app/validations/reserve/validateReserveUpdate');
const validateReserveGet = require('../app/validations/reserve/validateReserveGet');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:rentalId/reserve', validateReserve, ReserveController.create);
  routes.get('/:rentalId/reserve', validateReserveGet, ReserveController.list);
  routes.get('/:rentalId/reserve/:id', validateReserveGet, ReserveController.getById);
  routes.patch('/:rentalId/reserve/:id', validateReserveUpdate, ReserveController.update);
  routes.delete('/:rentalId/reserve/:id', ReserveController.delete);

  server.use(prefix, routes);
};
