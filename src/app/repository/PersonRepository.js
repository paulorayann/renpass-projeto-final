const PersonSchema = require('../schema/PersonSchema');
const Repository = require('./RepositoryPattern');

class PersonRepository extends Repository {
    constructor() {
        super(PersonSchema);
    }

    async auth(email) {
        return PersonSchema.findOne({ email }).select('+password');
    }
}

module.exports = new PersonRepository();
