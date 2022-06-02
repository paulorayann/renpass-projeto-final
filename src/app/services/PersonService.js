const PersonRepository = require('../repository/PersonRepository')

class PersonService {
    async create(payload) {
        const result = await PersonRepository.create(payload)
        return result
    }
    
    async list(payload) {
        const result = await PersonRepository.list(payload)
        return result
    }

    async getById(payload) {
        const result = await PersonRepository.getById(payload)
        return result
    }
}

module.exports = new PersonService()