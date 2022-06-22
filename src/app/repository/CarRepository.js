const CarSchema = require('../schema/CarSchema');
const Repository = require('./RepositoryPattern');

class CarRepository extends Repository {
    constructor() {
        super(CarSchema);
    }

    async list(payload) {
        const { limit = 15, page = 0, ...query } = payload;
        const customLabels = {
            totalDocs: 'total',
            docs: 'vehicles',
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
            page: Number(page),
            limit: Number(limit),
            customLabels: customLabels
        };
        return this.schema.paginate(query, options);
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
