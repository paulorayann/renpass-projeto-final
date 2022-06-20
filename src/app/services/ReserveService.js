const ReserveRepository = require('../repository/ReserveRepository');
// const CarRepository = require('../repository/CarRepository');
// const RentalRepository = require('../repository/RentalRepository');

const NotFound = require('../errors/NotFound');

class ReserveService {
    async create(payload) {
        const result = await ReserveRepository.create(payload);
        return result;
    }

    async list(payload) {
        const result = await ReserveRepository.list(payload);
        return result;
    }

    async getById(payload) {
        const result = await ReserveRepository.getById(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }

    async update(id, body) {
        const result = await ReserveRepository.update(id, body);
        if (!result) throw new NotFound(id, body);
        return result;
    }

    async delete(payload) {
        const result = await ReserveRepository.delete(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
}

module.exports = new ReserveService();
