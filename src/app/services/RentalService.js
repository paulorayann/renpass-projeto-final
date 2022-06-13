const RentalRepository = require('../repository/RentalRepository');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const SearchCEP = require('../utils/searchCep/SearchCep');

class RentalService {
    async create(payload) {
        for (let i = 0; i < payload.address.length; i++) {
            const fields = payload.address;
            const addressField = fields[i];
            const { cep, logradouro, complemento, bairro, localidade, uf } =
                await SearchCEP.getAddress(addressField.cep);

            addressField.cep = cep;
            addressField.street = logradouro;
            addressField.complement = complemento;
            addressField.district = bairro;
            addressField.city = localidade;
            addressField.state = uf;
        }
        const result = await RentalRepository.create(payload);
        return result;
    }
    async list(payload) {
        const result = await RentalRepository.list(payload);
        return result;
    }
    async getById(payload) {
        const result = await RentalRepository.getById(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
    async updateRental(id, body) {
        const result = await RentalRepository.updateRental(id, body);
        if (!result) throw new NotFound(id);
        return result;
    }
    async deleteRental(payload) {
        const result = await RentalRepository.deleteRental(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
}

module.exports = new RentalService();
