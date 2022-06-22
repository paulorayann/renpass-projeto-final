/* eslint-disable camelcase */
const FleetRepository = require('../repository/FleetRepository');
const CarRepository = require('../repository/CarRepository');
const RentalRepository = require('../repository/RentalRepository');

const NotFound = require('../errors/NotFound');

class FleetService {
    async create(rentalId, payload) {
        payload.id_rental = rentalId;
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new NotFound(`Rental Id ${rentalId}`);

        const { id_car } = payload;

        const validCar = await CarRepository.getById(id_car);
        if (!validCar) throw new NotFound(`Car Id ${id_car}`);

        const result = await FleetRepository.create(payload);
        if (!result) throw new Error('error creating Fleet');
        return result;
    }

    async list(payload) {
        const result = await FleetRepository.list(payload);
        return result;
    }

    async getById(payload, id) {
        const validRental = await RentalRepository.getById(id);
        if (!validRental) throw new NotFound(id);

        const result = await FleetRepository.getById(payload);
        if (!result) throw new NotFound(payload);

        return result;
    }

    async update(rentalId, id, payload) {
        payload.id_rental = rentalId;
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new NotFound(`Rental Id ${rentalId}`);

        if (payload.id_car) {
            const { id_car } = payload;
            const validCar = await CarRepository.getById(id_car);
            if (!validCar) throw new NotFound(`Car Id ${id_car}`);
        }

        const result = await FleetRepository.update(id, payload);
        if (!result) throw new NotFound(id);
        return result;
    }

    async delete(id, rentalId) {
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new NotFound(`Rental Id ${rentalId}`);

        const validFleet = await FleetRepository.getById(id, rentalId);
        if (!validFleet) throw new NotFound(`Fleet Id ${id}`);

        const result = await FleetRepository.delete(id);
        if (!result) throw new NotFound(id);
        return result;
    }
}

module.exports = new FleetService();
