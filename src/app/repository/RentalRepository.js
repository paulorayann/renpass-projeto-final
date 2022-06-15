const RentalSchema = require('../schema/RentalSchema');
const axios = require('axios').default;

class RentalRepository {
    async create(payload) {
        return RentalSchema.create(payload);
    }
    async list(payload) {
        const { limit = 10, offset = 1, ...query } = payload;
        const customLabels = {
            totalDocs: 'total',
            docs: 'rentals',
            offset: 'offset',
            nextPage: false,
            prevPage: false,
            totalPages: 'offsets',
            pagingCounter: false,
            meta: false,
            hasPrevPage: false,
            hasNextPage: false
        };
        const options = {
            offset: Number(offset),
            limit: Number(limit),
            customLabels: customLabels
        };
        return RentalSchema.paginate(query, options);
    }
    async getById(payload) {
        return RentalSchema.findById(payload);
    }
    async updateRental(id, body) {
        return RentalSchema.findByIdAndUpdate(id, body);
    }
    async deleteRental(payload) {
        return RentalSchema.findByIdAndDelete(payload);
    }
}

module.exports = new RentalRepository();
