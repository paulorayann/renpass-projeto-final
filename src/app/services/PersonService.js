/* eslint-disable no-throw-literal */
const PersonRepository = require('../repository/PersonRepository');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

class PersonService {
  async create(payload) {
    const result = await PersonRepository.create(payload);
    if (!result) throw new BadRequest(payload);
    return result;
  }

  async list(payload) {
    const result = await PersonRepository.list(payload);
    if (!result) throw new NotFound(payload);

    return result;
  }

  async getById(payload) {
    const result = await PersonRepository.getById(payload);
    if (!result) throw new NotFound(payload);
    return result;
  }

  async update(id, payload) {
    const result = await PersonRepository.update(id, payload);
    if (!result) throw new NotFound(id);
    return result;
  }

  async delete(payload) {
    const result = await PersonRepository.delete(payload);
    if (!result) throw new NotFound(payload);
    return result;
  }
}

module.exports = new PersonService();
