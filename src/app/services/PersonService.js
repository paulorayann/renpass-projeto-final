const PersonRepository = require('../repository/PersonRepository');
const NotFound = require('../errors/NotFound');

class PersonService {
    async create(payload) {
        const result = await PersonRepository.create(payload);
        if (!result) throw new Error(payload);
        return result;
    }

    async list(payload) {
        const result = await PersonRepository.list(payload);
        if (!result) throw new Error(payload);
        return result;
    }

    async getById(payload) {
        const result = await PersonRepository.getById(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }

    async updatePerson(id, body) {
        const result = await PersonRepository.updatePerson(id, body);
        if (!result) throw new NotFound(id);
        return result;
    }

    async deletePerson(payload) {
        const result = await PersonRepository.deletePerson(payload);
        if (!result) throw new NotFound(payload);
        return result;
    }
}

module.exports = new PersonService();
