const FleetController = require('../app/controllers/FleetController');
const validateFleet = require('../app/validations/fleet/validateFleet');
const validateFleetUpdate = require('../app/validations/fleet/validateFleetUpdate');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/:rentalId/fleet', validateFleet, FleetController.create);
    routes.get('/:rentalId/fleet', FleetController.list);
    routes.get('/:rentalId/fleet/:id', FleetController.getById);
    routes.patch(
        '/:rentalId/fleet/:id',
        validateFleetUpdate,
        FleetController.update
    );
    routes.delete('/:rentalId/fleet/:id', FleetController.delete);

    server.use(prefix, routes);
};
