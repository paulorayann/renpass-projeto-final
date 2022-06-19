const RentalSchema = require('../schema/RentalSchema');
const Repository = require('./RepositoryPattern');

class RentalRepository extends Repository {
    constructor() {
        super(RentalSchema);
    }
    async list(query) {
        const customLabels = {
            docs: 'rentals'
        };
        const options = {
            customLabels: customLabels
        };
        return RentalSchema.paginate(query, options);
    }
}

module.exports = new RentalRepository();
