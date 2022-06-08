const PersonController = require('../app/controllers/PersonController');
const validatePerson = require('../app/validations/person/validatePerson');
const validatePersonUpdate = require('../app/validations/person/validatePersonUpdate');

module.exports = (server, routes, prefix = '/api/v1/person') => {
    routes.post('/', validatePerson, PersonController.create);
    routes.get('/', PersonController.list);
    routes.get('/:id', PersonController.getById);
    routes.patch('/:id', validatePersonUpdate, PersonController.update);
    routes.delete('/:id', PersonController.delete);

    server.use(prefix, routes);
};
