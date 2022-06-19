class Repository {
    constructor(schema) {
        this.schema = schema;
    }

    async create(payload) {
        return this.schema.create(payload);
    }
    async list(query) {
        const { limit, offset } = query;
        const customLabels = {
            totalDocs: 'total',
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
        return this.schema.paginate(query, options);
    }

    async getById(payload) {
        return this.schema.findById(payload);
    }

    async update(id, payload) {
        return this.schema.findByIdAndUpdate(id, payload, { new: true });
    }

    async delete(payload) {
        return this.schema.findByIdAndDelete(payload);
    }
}

module.exports = Repository;
