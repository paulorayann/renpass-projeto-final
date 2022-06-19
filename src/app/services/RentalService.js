const RentalRepository = require('../repository/RentalRepository');
const NotFound = require('../errors/NotFound');
const SearchCEP = require('../utils/searchCep/SearchCep');
const cnpjValidation = require('../utils/cnpjValidation');

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
        if (!cnpjValidation(payload.cnpj)) {
            throw {
                message: 'Please enter a valid CNPJ'
            };
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
    async update(id, payload) {
        if (payload.cnpj) {
            if (!cnpjValidation(payload.cnpj)) {
                throw {
                    message: 'Please enter a valid CNPJ'
                };
            }
        }
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
