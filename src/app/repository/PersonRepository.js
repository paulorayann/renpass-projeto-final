const PersonSchema = require('../schema/PersonSchema');

class PersonRepository {
    async auth(email) {
        return PersonSchema.findOne({ email }).select('+password');
    }

    async create(payload) {
        return PersonSchema.create(payload);
    }

    async list(payload) {
        const { limit = 10, offset = 1, ...query } = payload;
        const customLabels = {
            totalDocs: 'total',
            docs: 'person',
            offset: 'offset',
            nextPage: false,
            prevPage: false,
            totalPages: 'offsets',
            pagingCounter: false,
            meta: false,
            hasPrevPage: false,
            hasNextPage: false
        };
        const options = {
            offset: Number(offset),
            limit: Number(limit),
            customLabels: customLabels
        };
        return PersonSchema.paginate(query, options);
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
