const ReserveService = require('../services/ReserveService');

class ReserveController {
    async create(req, res) {
        try {
            const result = await ReserveService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async list(req, res) {
        try {
            const result = await ReserveService.list(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const result = await ReserveService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await ReserveService.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await ReserveService.delete(req.params.id);
            return res.status(200).json('success');
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }
}

module.exports = new ReserveController();
