const PersonSchema = require('../schema/PersonSchema');

class PersonRepository {
    async auth(email) {
        return PersonSchema.findOne({ email }).select('+password');
    }

    async create(payload) {
        return PersonSchema.create(payload);
    }

    async list(payload) {
        const customLabels = {
            totalDocs: 'total',
            docs: 'Person',
            page: 'offset',
            nextPage: false,
            prevPage: false,
            totalPages: 'offsets',
            pagingCounter: false,
            meta: false,
            hasPrevPage: false,
            hasNextPage: false
        };
        const options = {
            limit: 5,
            offset: 1,
            customLabels: customLabels
        };
        return PersonSchema.paginate(payload, options, {});
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
