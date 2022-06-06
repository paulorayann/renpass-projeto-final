const AuthController = require('../app/controllers/AuthController');
const validateAuth = require('../app/validations/authentication/validateAuth');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
    routes.post('/', validateAuth, AuthController.auth);

    server.use(prefix, routes);
};
