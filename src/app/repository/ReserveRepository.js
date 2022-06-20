const ReserveSchema = require('../schema/ReserveSchema');
const Repository = require('./RepositoryPattern');

class ReserveRepository extends Repository {
    constructor() {
        super(ReserveSchema);
    }

    async getById(id, rentalId) {
        return ReserveSchema.findOne({ _id: id, id_rental: rentalId });
    }

    async update(id, rentalId, payload) {
        return ReserveSchema.findByIdAndUpdate(
            { _id: id, id_rental: rentalId },
            payload,
            { new: true }
        );
    }

    async delete(id, rentalId) {
        return ReserveSchema.findByIdAndDelete({
            _id: id,
            id_rental: rentalId
        });
    }
}

module.exports = new ReserveRepository();
