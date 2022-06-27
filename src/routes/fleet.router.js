const FleetController = require('../app/controllers/FleetController');
const validateFleet = require('../app/validations/fleet/validateFleet');
const validateFleetUpdate = require('../app/validations/fleet/validateFleetUpdate');
const validateFleetGet = require('../app/validations/fleet/validateFleetGet');
const validateIdFleet = require('../app/validations/fleet/validateIdFleet');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:rentalId/fleet', validateIdFleet, validateFleet, FleetController.create);
  routes.get('/:rentalId/fleet', validateIdFleet, validateFleetGet, FleetController.list);
  routes.get('/:rentalId/fleet/:id', validateIdFleet, validateFleetGet, FleetController.getById);
  routes.patch('/:rentalId/fleet/:id', validateIdFleet, validateFleetUpdate, FleetController.update);
  routes.delete('/:rentalId/fleet/:id', validateIdFleet, FleetController.delete);

  server.use(prefix, routes);
};
