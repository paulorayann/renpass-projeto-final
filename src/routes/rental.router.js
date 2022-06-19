const RentalController = require('../app/controllers/RentalController');
const validateRental = require('../app/validations/rental/validateRental');
const validateRentalUpdate = require('../app/validations/rental/validateRentalUpdate');
const validateId = require('../app/validations/validateId');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/', validateRental, RentalController.create);
    routes.get('/', RentalController.list);
    routes.get('/:id', validateId, RentalController.getById);
    routes.patch(
        '/:id',
        validateId,
        validateRentalUpdate,
        RentalController.update
    );
    routes.delete('/:id', validateId, RentalController.delete);

    server.use(prefix, routes);
};
