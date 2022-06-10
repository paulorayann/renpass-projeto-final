const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
    async create(payload) {
        return RentalSchema.create(payload);
    }
    async list(payload) {
        return RentalSchema.find(payload);
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
