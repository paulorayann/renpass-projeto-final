const CarService = require('../services/CarService');

class CarController {
    async create(req, res) {
        try {
            const result = await CarService.create(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async list(req, res) {
        const payload = req.query;
        try {
            const result = await CarService.list(payload);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async getById(req, res) {
        try {
            const result = await CarService.getById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async update(req, res) {
        try {
            const result = await CarService.updateCar(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async delete(req, res) {
        try {
            await CarService.deleteCar(req.params.id);
            return res.status(204).end();
        } catch (error) {
            return res.status(error.errorStatus).json(error);
        }
    }

    async updateCarAccessory(req, res) {
        const { id, accessoryId } = req.params;
        try {
            const result = await CarService.updateCarAccessory(
                id,
                accessoryId,
                req.body
            );
            return res.status(200).json(result);
        } catch (error) {
            res.status(404).json(error);
        }
    }
}

module.exports = new CarController();
