const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./RepositoryPattern');

class FleetRepository extends Repository {
  constructor() {
    super(FleetSchema);
  }

  async list(payload) {
    const { limit = 15, page = 0, ...query } = payload;
    const customLabels = {
      totalDocs: 'total',
      docs: 'fleet',
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
      customLabels
    };
    return FleetSchema.paginate(query, options);
  }
}
module.exports = new FleetRepository();
