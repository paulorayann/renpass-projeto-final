const CarController = require('../app/controllers/CarController')

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', CarController.create)
    routes.get('/', CarController.list)
    routes.get('/:id', CarController.list)
    routes.put('/:id', CarController.update)
    routes.patch('/:id', CarController.update)
    routes.delete('/:id', CarController.delete)


    server.use(prefix, routes)
}