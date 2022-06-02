const PersonController = require('../app/controllers/PersonController')

module.exports = (server, routes, prefix = '/api/v1/person') => {
    routes.post('/', PersonController.create)
    routes.get('/', PersonController.list)
    routes.get('/:id', PersonController.getById)


    server.use(prefix, routes)
}