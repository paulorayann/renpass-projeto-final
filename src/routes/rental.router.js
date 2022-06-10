const RentalController = require('../app/controllers/RentalController');
const validateRental = require('../app/validations/rental/validateRental');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/', validateRental, RentalController.create);
    routes.get('/', RentalController.list);
    routes.get('/:id', RentalController.getById);
    routes.patch('/:id', RentalController.update);
    routes.delete('/:id', RentalController.delete);

    server.use(prefix, routes);
};
