const PersonSchema = require('../schema/PersonSchema')

class PersonRepository {
    async create(payload) {
        return PersonSchema.create(payload)
    }
}

module.exports = new PersonRepository()