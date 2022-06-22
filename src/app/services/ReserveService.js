/* eslint-disable camelcase */
const ReserveRepository = require('../repository/ReserveRepository');
const RentalRepository = require('../repository/RentalRepository');
const PersonRepository = require('../repository/PersonRepository');
const CarRepository = require('../repository/CarRepository');

const CantDrive = require('../errors/CantDrive');
const NotFound = require('../errors/NotFound');
const ReserveUtils = require('../utils/reserve/ReserveUtils');

class ReserveService {
    async create(rentalId, payload) {
        payload.id_rental = rentalId;
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new NotFound(`Rental Id ${rentalId}`);

        const { id_car } = payload;
        const validCar = await CarRepository.getById(payload.id_car, rentalId);
        if (!validCar) throw new NotFound(`Car Id ${id_car}`);

        const { id_user } = payload;
        const validUser = await PersonRepository.getById(id_user);
        if (!validUser) throw new NotFound(`User Id ${id_user}`);

        if (validUser.canDrive !== 'yes') {
            throw new CantDrive(id_user);
        }

        await ReserveUtils.validDate(payload.data_start, payload.data_end);
        await ReserveUtils.sameDayCarReserve(
            payload.id_car,
            payload.data_start,
            payload.data_end
        );

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
        if (!validRental) throw new NotFound(`Rental Id ${rentalId}`);

        if (payload.id_car) {
            const { id_car } = payload;
            const validCar = await CarRepository.getById(id_car);
            if (!validCar) throw new NotFound(`Car Id ${id_car}`);
        }
        if (payload.id_user) {
            const { id_user } = payload;
            const validUser = await PersonRepository.getById(id_user);
            if (!validUser) throw new NotFound(`User Id ${id_user}`);

            if (validUser.canDrive !== 'yes') {
                throw new CantDrive(id_user);
            }
        }

        await ReserveUtils.validDate(payload.data_start, payload.data_end);
        await ReserveUtils.sameDayCarReserve(
            payload.id_car,
            payload.data_start,
            payload.data_end
        );

        const result = await ReserveRepository.update(id, payload);
        if (!result) throw new NotFound(id);
        return result;
    }

    async delete(id, rentalId) {
        const validRental = await RentalRepository.getById(rentalId);
        if (!validRental) throw new NotFound(`Rental Id ${rentalId}`);

        const validReserve = await ReserveRepository.getById(id, rentalId);
        if (!validReserve) throw new NotFound(`Reserve Id ${id}`);

        const result = await ReserveRepository.delete(id);
        if (!result) throw new NotFound(id);
        return result;
    }
}

module.exports = new ReserveService();
