const PersonSchema = require('../schema/PersonSchema');
const Repository = require('./RepositoryPattern');

class PersonRepository extends Repository {
  constructor() {
    super(PersonSchema);
  }

  async list(payload) {
    const { limit = 15, page = 0, ...query } = payload;
    const customLabels = {
      totalDocs: 'total',
      docs: 'person',
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
    return PersonSchema.paginate(query, options);
  }

  async auth(email) {
    return PersonSchema.findOne({ email }).select('+password');
  }
}

module.exports = new PersonRepository();
