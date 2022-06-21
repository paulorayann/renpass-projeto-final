const ReserveService = require('../services/ReserveService');

class ReserveController {
    async create(req, res) {
        try {
            const { rentalId } = req.params;
            const result = await ReserveService.create(rentalId, req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async list(req, res) {
        try {
            const result = await ReserveService.list(req.query, req.params);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({ error: error.description, message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id, rentalId } = req.params;
            const result = await ReserveService.getById(id, rentalId);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id, rentalId } = req.params;
            const result = await ReserveService.update(rentalId, id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id, rentalId } = req.params;
            await ReserveService.delete(id, rentalId);
            return res.status(204).end();
        } catch (error) {
            return res
                .status(error.errorStatus || 404)
                .json({ error: error.description, message: error.message });
        }
    }
}

module.exports = new ReserveController();
