const RentalSchema = require('../schema/RentalSchema');
const axios = require('axios').default;

class RentalRepository {
    async create(payload) {
        return RentalSchema.create(payload);
    }
    async list(query) {
        const { limit, offset } = query;
        const customLabels = {
            totalDocs: 'total',
            docs: 'Rentals',
            page: 'offset',
            nextPage: false,
            prevPage: false,
            totalPages: 'offsets',
            pagingCounter: false,
            meta: false,
            hasPrevPage: false,
            hasNextPage: false
        };
        const options = {
            limit: parseInt(limit, 10) || 10,
            offset: parseInt(offset, 0) || 1,
            customLabels: customLabels
        };
        return RentalSchema.paginate(query, options, {});
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
