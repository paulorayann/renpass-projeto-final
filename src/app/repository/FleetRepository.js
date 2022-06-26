const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./RepositoryPattern');

class FleetRepository extends Repository {
  constructor() {
    super(FleetSchema);
  }

  async list(payload) {
    return FleetSchema.find(payload);
  }
}
module.exports = new FleetRepository();
