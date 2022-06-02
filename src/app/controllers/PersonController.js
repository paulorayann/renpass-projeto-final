const PersonService = require('../services/PersonService')

class PersonController {
    async create(req, res) {
        try {
            const result = await PersonService.create(req.body)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

module.exports = new PersonController()