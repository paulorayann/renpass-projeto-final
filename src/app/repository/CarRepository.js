const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload) {
        return CarSchema.create(payload);
    }

    async list(payload) {
        const { limit = 10, offset = 1, ...query } = payload;
        const customLabels = {
            totalDocs: 'total',
            docs: 'vehicles',
            nextPage: false,
            prevPage: false,
            offset: 'offset',
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
        return CarSchema.paginate(query, options);
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

    async updateCarAccessory(id, accessoryId, updatedAccessory) {
        const result = await CarSchema.findOneAndUpdate(
            { _id: id, 'accessories._id': accessoryId },

            {
                $set: {
                    'accessories.$.description': updatedAccessory.description
                }
            },

            { returnDocument: 'after', new: true }
        );

        return result;
    }
}

module.exports = new CarRepository();
