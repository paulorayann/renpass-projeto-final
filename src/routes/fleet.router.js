const FleetController = require('../app/controllers/FleetController');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/:rentalId/fleet', FleetController.create);
    routes.get('/:rentalId/fleet', FleetController.list);
    routes.get('/:rentalId/fleet/:id', FleetController.getById);
    routes.patch('/:rentalId/fleet/:id', FleetController.update);
    routes.delete('/:rentalId/fleet/:id', FleetController.delete);

    server.use(prefix, routes);
};
