const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload) {
        return CarSchema.create(payload);
    }

    async list(query) {
        const { limit, offset } = query;
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

        const options = {
            limit: parseInt(limit, 10) || 10,
            offset: parseInt(offset, 0) || 1,
            customLabels: customLabels
        };
        return CarSchema.paginate(query, options, {});
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
            // {
            //     $pull: {
            //         accessories: {
            //             description: {
            //                 $eq: ''
            //             }
            //         }
            //     }
            // },
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
