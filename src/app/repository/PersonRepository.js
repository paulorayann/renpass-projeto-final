const PersonSchema = require('../schema/PersonSchema');

class PersonRepository {
    async auth(email) {
        return PersonSchema.findOne({ email }).select('+password');
    }

    async create(payload) {
        return PersonSchema.create(payload);
    }

    async list(payload) {
        return PersonSchema.find(payload);
    }

    async getById(payload) {
        return PersonSchema.findById(payload);
    }

    async updatePerson(id, body) {
        return PersonSchema.findByIdAndUpdate(id, body);
    }

    async deletePerson(payload) {
        return PersonSchema.findByIdAndDelete(payload);
    }
}

module.exports = new PersonRepository();
