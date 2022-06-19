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

    async update(id, body) {
        const result = await CarRepository.update(id, body);
        if (!result) throw new NotFound(id, body);
        return result;
    }

    async delete(payload) {
        const result = await CarRepository.delete(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }

    async updateCarAccessory(id, accessoryId, updatedAccessory) {
        const result = await CarRepository.updateCarAccessory(
            id,
            accessoryId,
            updatedAccessory
        );
        return result;
    }
}

module.exports = new CarService();
