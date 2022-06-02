const {Router} = require('express')

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