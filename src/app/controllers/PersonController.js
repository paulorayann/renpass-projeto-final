const PersonService = require('../services/PersonService');

class PersonController {
    async create(req, res) {
        try {
            const result = await PersonService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async list(req, res) {
        try {
            const result = await PersonService.list(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const result = await PersonService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error, description: error.description });
        }
    }

    async update(req, res) {
        try {
            const result = await PersonService.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error, description: error.description });
        }
    }

    async delete(req, res) {
        try {
            await PersonService.delete(req.params.id);
            return res.status(200).json('success');
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error, description: error.description });
        }
    }
}

module.exports = new PersonController();
