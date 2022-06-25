const CarService = require('../services/CarService');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 400).json({ error: error.description, message: error.message });
    }
  }

  async list(req, res) {
    const payload = req.query;
    try {
      const result = await CarService.list(payload);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 400).json({ error: error.description, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await CarService.getById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 404).json({ error: error.description, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await CarService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 404).json({ error: error.description, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CarService.delete(req.params.id);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.errorStatus || 404).json({ error: error.description, message: error.message });
    }
  }

  async updateCarAccessory(req, res) {
    try {
      const { id, accessoryId } = req.params;
      const updatedAccessory = req.body;
      const result = await CarService.updateCarAccessory(id, accessoryId, updatedAccessory);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.description,
        message: error.message
      });
    }
  }
}

module.exports = new CarController();
