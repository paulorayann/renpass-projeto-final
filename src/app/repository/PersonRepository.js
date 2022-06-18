const PersonSchema = require('../schema/PersonSchema');

class PersonRepository {
    async auth(email) {
        return PersonSchema.findOne({ email }).select('+password');
    }

    async create(payload) {
        return PersonSchema.create(payload);
    }

    async list(query) {
        const { limit, offset } = query;
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
            limit: parseInt(limit, 10) || 10,
            offset: parseInt(offset, 0) || 1,
            customLabels: customLabels
        };
        return PersonSchema.paginate(query, options, {});
    }

    async getById(payload) {
        return PersonSchema.findById(payload);
    }

    async updatePerson(id, payload) {
        return PersonSchema.findByIdAndUpdate(id, payload);
    }

    async deletePerson(payload) {
        return PersonSchema.findByIdAndDelete(payload);
    }
}

module.exports = new PersonRepository();
