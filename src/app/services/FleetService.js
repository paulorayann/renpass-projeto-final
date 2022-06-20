/* eslint-disable camelcase */
const FleetRepository = require('../repository/FleetRepository');
const CarRepository = require('../repository/CarRepository');
const RentalRepository = require('../repository/RentalRepository');

const NotFound = require('../errors/NotFound');

class FleetService {
    async create(rentalId, payload) {
        payload.id_rental = rentalId;
        const rental = await RentalRepository.getById(rentalId);
        if (!rental) throw new Error('id_rental not found');

        const { id_car } = payload;

        const car = await CarRepository.getById(id_car);
        if (!car) throw new Error('id_car not found');

        const result = await FleetRepository.create(payload);
        if (!result) throw new Error('error creating Fleet');
        return result;
    }

    async list(payload) {
        const result = await FleetRepository.list(payload);
        if (result.docs.length === 0) throw new Error('There are no Fleets');
        return result;
    }

    async getById(payload, id) {
        const rental = await RentalRepository.getById(id);
        if (!rental) throw new NotFound(id);

        const result = await FleetRepository.getById(payload);
        if (!result) throw new NotFound(payload);

        return result;
    }

    async update(rentalId, id, payload) {
        payload.id_rental = rentalId;
        const rental = await RentalRepository.getById(rentalId);
        if (!rental) throw new Error('id_rental not found');

        if (payload.id_car) {
            const { id_car } = payload;
            const car = await CarRepository.getById(id_car);
            if (!car) throw new Error('id_car not found');
        }

        const result = await FleetRepository.update(id, payload);
        if (!result) throw new NotFound(id);
        return result;
    }

    async delete(id, rentalId) {
        const rental = await RentalRepository.getById(rentalId);
        if (!rental) throw new Error('id_rental not found');

        const reserve = await FleetRepository.getById(id, rentalId);
        if (!reserve) throw new Error('Not found');

        const result = await FleetRepository.delete(id);
        if (!result) throw new NotFound(id);
        return result;
    }
}

module.exports = new FleetService();
