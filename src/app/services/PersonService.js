const PersonRepository = require('../repository/PersonRepository')

class PersonService {
    async create(payload) {
        const result = await PersonRepository.create(payload)
        return result
    }
}

module.exports = new PersonService()