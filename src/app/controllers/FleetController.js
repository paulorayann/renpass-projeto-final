const FleetService = require('../services/FleetService');

class FleetController {
    async create(req, res) {
        try {
            const result = await FleetService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async list(req, res) {
        try {
            const result = await FleetService.list(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const result = await FleetService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await FleetService.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await FleetService.delete(req.params.id);
            return res.status(200).json('success');
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }
}

module.exports = new FleetController();
