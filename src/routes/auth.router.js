const AuthController = require('../app/controllers/AuthController');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
    routes.post('/', AuthController.auth);

    server.use(prefix, routes);
};
