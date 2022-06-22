/* eslint-disable camelcase */
const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./RepositoryPattern');

class FleetRepository extends Repository {
    constructor() {
        super(FleetSchema);
    }

    async list(payload) {
        return FleetSchema.find(payload);
    }

    async getById(payload) {
        return FleetSchema.findById(payload);
    }

    async delete(id, rentalId) {
        return FleetSchema.findByIdAndDelete({
            _id: id,
            id_rental: rentalId
        });
    }
}
module.exports = new FleetRepository();
