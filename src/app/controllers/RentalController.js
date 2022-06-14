const RentalService = require('../services/RentalService');

class RentalController {
    async create(req, res) {
        try {
            const result = await RentalService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res
                .status(400)
                .json({
                    message: error.message,
                    description: error.description
                });
        }
    }

    async list(req, res) {
        try {
            const result = await RentalService.list(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async getById(req, res) {
        try {
            const result = await RentalService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async update(req, res) {
        try {
            const result = await RentalService.updateRental(
                req.params.id,
                req.body
            );
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            await RentalService.deleteRental(req.params.id);
            return res.status(204).end();
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }
}

module.exports = new RentalController();
