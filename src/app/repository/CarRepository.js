const CarSchema = require('../schema/CarSchema');
const Repository = require('./RepositoryPattern');

class CarRepository extends Repository {
    constructor() {
        super(CarSchema);
    }
    async list(query) {
        const customLabels = {
            docs: 'vehicles'
        };
        const options = {
            customLabels: customLabels
        };
        return CarSchema.paginate(query, options);
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
