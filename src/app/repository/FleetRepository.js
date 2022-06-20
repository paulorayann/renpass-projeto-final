const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./RepositoryPattern');

class FleetRepository extends Repository {
    constructor() {
        super(FleetSchema);
    }

    async getById(id, rentalId) {
        return FleetSchema.findById({ _id: id, id_rental: rentalId });
    }

    async delete(id, rentalId) {
        return FleetSchema.findByIdAndDelete({
            _id: id,
            id_rental: rentalId
        });
    }
}
module.exports = new FleetRepository();
