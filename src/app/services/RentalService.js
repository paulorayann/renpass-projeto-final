RentalRepository = require('../repository/RentalRepository');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

class RentalService {
    async create(payload) {
        const result = await RentalRepository.create(payload);
        if (!result) throw new BadRequest(payload);
        return result;
    }
    async list(payload) {
        const result = await RentalRepository.list(payload);
        return result;
    }
    async getById(payload) {
        const result = await RentalRepository.getById(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
    async updateRental(id, body) {
        const result = await RentalRepository.updateRental(id, body);
        if (!result) throw new NotFound(id, body);
        return result;
    }
    async deleteRental(payload) {
        const result = await RentalRepository.deleteRental(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
}

module.exports = new RentalService();
