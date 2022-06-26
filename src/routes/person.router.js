const PersonController = require('../app/controllers/PersonController');
const validatePerson = require('../app/validations/person/validatePerson');
const validatePersonUpdate = require('../app/validations/person/validatePersonUpdate');
const validateId = require('../app/validations/validateId');
const validatePersonGet = require('../app/validations/person/validatePersonGet');

module.exports = (server, routes, prefix = '/api/v1/person') => {
  routes.post('/', validatePerson, PersonController.create);
  routes.get('/', validatePersonGet, PersonController.list);
  routes.get('/:id', validateId, validatePersonGet, PersonController.getById);
  routes.patch('/:id', validateId, validatePersonUpdate, PersonController.update);
  routes.delete('/:id', validateId, PersonController.delete);

  server.use(prefix, routes);
};
