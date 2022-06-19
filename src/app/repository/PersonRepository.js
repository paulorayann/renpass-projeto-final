const PersonSchema = require('../schema/PersonSchema');
const Repository = require('./RepositoryPattern');

class PersonRepository extends Repository {
    constructor() {
        super(PersonSchema);
    }
    async list(query) {
        const customLabels = {
            docs: 'person'
        };
        const options = {
            customLabels: customLabels
        };
        return PersonSchema.paginate(query, options);
    }
}

module.exports = new PersonRepository();
