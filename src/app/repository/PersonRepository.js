const PersonSchema = require('../schema/PersonSchema')

class PersonRepository {
    async create(payload) {
        return PersonSchema.create(payload)
    }

    async list(payload) {
        return PersonSchema.find(payload)
    }
    async getById(payload) {
        return PersonSchema.findById(payload)
    }
}

module.exports = new PersonRepository()