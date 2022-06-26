const RentalRepository = require('../repository/RentalRepository');
const NotFound = require('../errors/NotFound');
const SearchCEP = require('../utils/searchCep/SearchCep');
const BadRequest = require('../errors/BadRequest');

class RentalService {
  async create(payload) {
    for (let i = 0; i < payload.address.length; i++) {
      const fields = payload.address;
      const addressField = fields[i];
      // eslint-disable-next-line no-await-in-loop
      const { cep, logradouro, complemento, bairro, localidade, uf } = await SearchCEP.getAddress(addressField.zipCode);
      addressField.zipCode = cep;
      addressField.street = logradouro;
      addressField.complement = complemento;
      addressField.district = bairro;
      addressField.city = localidade;
      addressField.state = uf;
    }
    const result = await RentalRepository.create(payload);
    if (!result) throw new BadRequest(payload);
    return result;
  }

  async list(payload) {
    const result = await RentalRepository.list(payload);
    if (!result) throw new BadRequest(payload);
    return result;
  }

  async getById(payload) {
    const result = await RentalRepository.getById(payload);
    if (!result) throw new NotFound(payload);
    return result;
  }

  async update(id, payload) {
    const result = await RentalRepository.update(id, payload);
    if (!result) throw new NotFound(id, payload);
    return result;
  }

  async delete(payload) {
    const result = await RentalRepository.delete(payload);
    if (!result) throw new NotFound(payload);
    return result;
  }
}

module.exports = new RentalService();
