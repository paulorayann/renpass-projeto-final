const RentalService = require('../services/RentalService');

class RentalController {
    async create(req, res) {
        try {
            const result = await RentalService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({
                error,
                description: error.description
            });
        }
    }

    async list(req, res) {
        try {
            const result = await RentalService.list(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus || 400).json({
                error,
                description: error.description
            });
        }
    }

    async getById(req, res) {
        try {
            const result = await RentalService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus || 404).json({
                error,
                description: error.description
            });
        }
    }

    async update(req, res) {
        try {
            const result = await RentalService.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus || 404).json({
                error,
                description: error.description
            });
        }
    }

    async delete(req, res) {
        try {
            await RentalService.delete(req.params.id);
            return res.status(204).end();
        } catch (error) {
            return res.status(error.errorStatus || 404).json({
                error,
                description: error.description
            });
        }
    }
}

module.exports = new RentalController();
