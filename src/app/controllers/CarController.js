const CarService = require('../services/CarService')

class CarController {
    async create(req, res) {
        try{
           const result = await CarService.create(req.body)
           return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

module.exports = new CarController()