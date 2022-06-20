const ReserveController = require('../app/controllers/ReserveController');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/:rentalId/reserve', ReserveController.create);
    routes.get('/:rentalId/reserve', ReserveController.list);
    routes.get('/:rentalId/reserve/:id', ReserveController.getById);
    routes.patch('/:rentalId/reserve/:id', ReserveController.update);
    routes.delete('/:rentalId/reserve/:id', ReserveController.delete);

    server.use(prefix, routes);
};
