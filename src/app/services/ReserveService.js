/* eslint-disable camelcase */
const ReserveRepository = require('../repository/ReserveRepository');
const CarRepository = require('../repository/CarRepository');
const RentalRepository = require('../repository/RentalRepository');
const PersonRepository = require('../repository/PersonRepository');

const NotFound = require('../errors/NotFound');

class ReserveService {
    async create(rentalId, payload) {
        payload.id_rental = rentalId;
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new Error('id_rental not found');

        const { id_car } = payload;

        const validCar = await CarRepository.getById(id_car);
        if (!validCar) throw new Error('id_car not found');

        const { id_user } = payload;

        const validUser = await PersonRepository.getById(id_user);
        if (!validUser) throw new Error('id_user not found');

        const result = await ReserveRepository.create(payload);
        if (!result) throw new Error('error creating reserve');
        return result;
    }

    async list(payload) {
        const result = await ReserveRepository.list(payload);
        if (result.docs.length === 0)
            throw new Error('There are no Reservations');
        return result;
    }

    async getById(payload, id) {
        const validRental = await RentalRepository.getById(id);
        if (!validRental) throw new NotFound(id);

        const result = await ReserveRepository.getById(payload);
        if (!result) throw new NotFound(payload);

        return result;
    }

    async update(rentalId, id, payload) {
        payload.id_rental = rentalId;
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new Error('id_rental not found');

        if (payload.id_car) {
            const { id_car } = payload;
            const validCar = await CarRepository.getById(id_car);
            if (!validCar) throw new Error('id_car not found');
        }
        if (payload.id_user) {
            const { id_user } = payload;

            const validUser = await PersonRepository.getById(id_user);
            if (!validUser) throw new Error('id_user not found');
        }

        const result = await ReserveRepository.update(id, payload);
        if (!result) throw new NotFound(id);
        return result;
    }

    async delete(id, rentalId) {
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new Error('id_rental not found');

        const validReserve = await ReserveRepository.getById(id, rentalId);
        if (!validReserve) throw new Error('Not found');

        const result = await ReserveRepository.delete(id);
        if (!result) throw new NotFound(id);
        return result;
    }
}

module.exports = new ReserveService();
