const routes = require('.')
const CarController = require('../app/controllers/CarController')

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', CarController.create)


    server.use(prefix, routes)
}