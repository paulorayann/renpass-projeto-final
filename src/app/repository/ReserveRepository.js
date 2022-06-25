const ReserveSchema = require('../schema/ReserveSchema');
const Repository = require('./RepositoryPattern');

class ReserveRepository extends Repository {
  constructor() {
    super(ReserveSchema);
  }

  async list(payload) {
    const { limit = 15, page = 0, ...query } = payload;
    const customLabels = {
      totalDocs: 'total',
      docs: 'reserves',
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
    return ReserveSchema.paginate(query, options);
  }

  async getById(id, rentalId) {
    return ReserveSchema.findById({ _id: id, id_rental: rentalId });
  }

  async delete(id, rentalId) {
    return ReserveSchema.findByIdAndDelete({
      _id: id,
      id_rental: rentalId
    });
  }
}

module.exports = new ReserveRepository();
