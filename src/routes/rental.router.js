const RentalController = require('../app/controllers/RentalController');
const validateRental = require('../app/validations/rental/validateRental');
const validateRentalUpdate = require('../app/validations/rental/validateRentalUpdate');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/', validateRental, RentalController.create);
    routes.get('/', RentalController.list);
    routes.get('/:id', RentalController.getById);
    routes.patch('/:id', validateRentalUpdate, RentalController.update);
    routes.delete('/:id', RentalController.delete);

    server.use(prefix, routes);
};
