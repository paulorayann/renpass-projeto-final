const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../../swagger.json');

module.exports = (server, routes, prefix = '/api/v1') => {
    routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    server.use(prefix, routes);
};
