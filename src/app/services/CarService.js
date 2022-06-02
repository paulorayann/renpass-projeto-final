const CarRepository = require('../repository/CarRepository')

class CarService {

    async create(payload) {
        const result = await CarRepository.create(payload)
        return result
    }

}

module.exports = new CarService()