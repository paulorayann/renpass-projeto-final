const RentalSchema = require('../schema/RentalSchema');
const Repository = require('./RepositoryPattern');

class RentalRepository extends Repository {
    constructor() {
        super(RentalSchema);
    }
}

module.exports = new RentalRepository();
