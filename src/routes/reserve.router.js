const ReserveController = require('../app/controllers/ReserveController');
const validateReserve = require('../app/validations/reserve/validateReserve');
const validateReserveUpdate = require('../app/validations/reserve/validateReserveUpdate');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:rentalId/reserve', validateReserve, ReserveController.create);
  routes.get('/:rentalId/reserve', ReserveController.list);
  routes.get('/:rentalId/reserve/:id', ReserveController.getById);
  routes.patch('/:rentalId/reserve/:id', validateReserveUpdate, ReserveController.update);
  routes.delete('/:rentalId/reserve/:id', ReserveController.delete);

  server.use(prefix, routes);
};
