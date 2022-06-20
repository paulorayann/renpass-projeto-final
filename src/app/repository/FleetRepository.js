const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./RepositoryPattern');

class FleetRepository extends Repository {
    constructor() {
        super(FleetSchema);
    }

    async getById(id, rentalId) {
        return FleetSchema.findOne({ _id: id, id_rental: rentalId });
    }

    async update(id, rentalId, payload) {
        return FleetSchema.findByIdAndUpdate(
            { _id: id, id_rental: rentalId },
            payload,
            { new: true }
        );
    }

    async delete(id, rentalId) {
        return FleetSchema.findByIdAndDelete({
            _id: id,
            id_rental: rentalId
        });
    }
}
module.exports = new FleetRepository();
