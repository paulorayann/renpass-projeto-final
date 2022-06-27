const FleetService = require('../services/FleetService');

class FleetController {
  async create(req, res) {
    try {
      const { rentalId } = req.params;
      const result = await FleetService.create(rentalId, req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 400).json({ error: error.description, message: error.message });
    }
  }

  async list(req, res) {
    try {
      const result = await FleetService.list(req.query, req.params);
      if (result.fleet.length === 0) {
        return res.status(204).end();
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 400).json({ error: error.description, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id, rentalId } = req.params;
      const result = await FleetService.getById(id, rentalId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 404).json({ error: error.description, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id, rentalId } = req.params;
      const result = await FleetService.update(rentalId, id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 404).json({ error: error.description, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id, rentalId } = req.params;
      await FleetService.delete(id, rentalId);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.errorStatus || 404).json({ error: error.description, message: error.message });
    }
  }
}

module.exports = new FleetController();
