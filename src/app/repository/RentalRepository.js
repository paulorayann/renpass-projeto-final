/* eslint-disable constructor-super */
const RentalSchema = require('../schema/RentalSchema');
const Repository = require('./RepositoryPattern');

class RentalRepository extends Repository {
    constructor() {
        super(RentalSchema);
    }

    async list(payload) {
        const { limit = 15, page = 0, ...query } = payload;
        const customLabels = {
            totalDocs: 'total',
            docs: 'rentals',
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
            page: Number(page),
            limit: Number(limit),
            customLabels: customLabels
        };
        return RentalSchema.paginate(query, options);
    }
}

module.exports = new RentalRepository();
