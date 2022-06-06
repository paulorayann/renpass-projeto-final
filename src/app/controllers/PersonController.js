const PersonService = require('../services/PersonService');

class PersonController {
    async create(req, res) {
        try {
            const result = await PersonService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async list(req, res) {
        const payload = req.query;
        try {
            const result = await PersonService.list(payload);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async getById(req, res) {
        try {
            const result = await PersonService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }
    async update(req, res) {
        try {
            const result = await PersonService.updatePerson(
                req.params.id,
                req.body
            );
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async delete(req, res) {
        try {
            const result = await PersonService.deletePerson(req.params.id);
            return res.status(200).json('success');
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}

module.exports = new PersonController();
