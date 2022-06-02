const {Router} = require('express')
const car = require('./car.router')

module.exports = (server) => {
    server.use((req, res, next)=>{
        car(server, new Router())
        next()
    })

    server.use((req, res, next)=>{
        person(server, new Router())
        next()
    })

}