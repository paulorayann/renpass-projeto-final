const FleetRepository = require('../repository/FleetRepository');
// const CarRepository = require('../repository/CarRepository');
// const RentalRepository = require('../repository/RentalRepository');

const NotFound = require('../errors/NotFound');

class FleetService {
    async create(payload) {
        const result = await FleetRepository.create(payload);
        return result;
    }

    async list(payload) {
        const result = await FleetRepository.list(payload);
        return result;
    }

    async getById(payload) {
        const result = await FleetRepository.getById(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }

    async update(id, body) {
        const result = await FleetRepository.update(id, body);
        if (!result) throw new NotFound(id, body);
        return result;
    }

    async delete(payload) {
        const result = await FleetRepository.delete(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
}

module.exports = new FleetService();
