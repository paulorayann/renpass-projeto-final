const PersonController = require('../app/controllers/PersonController')

module.exports = (server, routes, prefix = '/api/v1/person') => {
    routes.post('/', PersonController.create)
    routes.get('/', PersonController.list)
    routes.get('/:id', PersonController.getById)
    routes.put('/:id', PersonController.update)
    routes.patch('/:id', PersonController.update)
    routes.delete('/:id', PersonController.delete)


    server.use(prefix, routes)
}