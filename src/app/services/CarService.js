const CarRepository = require('../repository/CarRepository');
const NotFound = require('../errors/NotFound');

class CarService {
    async create(payload) {
        const result = await CarRepository.create(payload);
        return result;
    }

    async list(payload) {
        const result = await CarRepository.list(payload);
        return result;
    }

    async getById(payload) {
        const result = await CarRepository.getById(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }

    async updateCar(id, body) {
        const result = await CarRepository.updateCar(id, body);
        if (!result) throw new NotFound(id, body);
        return result;
    }

    async deleteCar(payload) {
        const result = await CarRepository.deleteCar(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
}

module.exports = new CarService();
