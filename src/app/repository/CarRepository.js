const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload) {
        return CarSchema.create(payload);
    }

    async list(payload) {
        const customLabels = {
            totalDocs: 'total',
            docs: 'Car',
            page: 'offset',
            nextPage: false,
            prevPage: false,
            totalPages: 'offsets',
            pagingCounter: false,
            meta: false,
            hasPrevPage: false,
            hasNextPage: false
        };
        const { limit, offset } = payload;
        const options = {
            limit: parseInt(limit, 10) || 10,
            offset: parseInt(offset, 0) || 1,
            customLabels: customLabels
        };
        return CarSchema.paginate({}, options);
    }

    async getById(payload) {
        return CarSchema.findById(payload);
    }

    async updateCar(id, body) {
        return CarSchema.findByIdAndUpdate(id, body);
    }

    async deleteCar(payload) {
        return CarSchema.findByIdAndDelete(payload);
    }
}

module.exports = new CarRepository();
