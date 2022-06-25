class Repository {
  constructor(schema) {
    this.schema = schema;
  }

  async create(payload) {
    return this.schema.create(payload);
  }

  async list(payload) {
    return this.schema.find(payload);
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
