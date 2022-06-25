const PersonController = require('../app/controllers/PersonController');
const validatePerson = require('../app/validations/person/validatePerson');
const validatePersonUpdate = require('../app/validations/person/validatePersonUpdate');
const validateId = require('../app/validations/validateId');

module.exports = (server, routes, prefix = '/api/v1/person') => {
  routes.post('/', validatePerson, PersonController.create);
  routes.get('/', PersonController.list);
  routes.get('/:id', validateId, PersonController.getById);
  routes.patch('/:id', validateId, validatePersonUpdate, PersonController.update);
  routes.delete('/:id', validateId, PersonController.delete);

  server.use(prefix, routes);
};
