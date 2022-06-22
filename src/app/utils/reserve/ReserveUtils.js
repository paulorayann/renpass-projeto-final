/* eslint-disable no-shadow */
/* eslint-disable no-throw-literal */
/* eslint-disable camelcase */
const moment = require('moment');
const ReserveRepository = require('../../repository/ReserveRepository');

class ReserveUtils {
    static async sameDayCarReserve(id_car, data_start, data_end) {
        const result = await ReserveRepository.list({
            id_car,
            data_start,
            data_end
        });

        result.reserves.forEach((reserve) => {
            const { data_start, data_end } = reserve;
            throw new Error(
                `The car is already booked, it was booked for the date ${data_start} to the date ${data_end}`
            );
        });
    }

    static async validDate(data_start, data_end) {
        const dataStart = moment(data_start, 'DD/MM/YYYY').isSameOrBefore(
            moment(data_end, 'DD/MM/YYYY'),
            'days'
        );
        if (!dataStart)
            throw new Error('Data_start must be before than the Data_end');

        const dataEnd = moment(data_end, 'DD/MM/YYYY').isSameOrAfter(
            moment(data_start, 'DD/MM/YYYY'),
            'days'
        );
        if (!dataEnd)
            throw new Error('Data_end must be after than the Data_start');
    }
}

module.exports = ReserveUtils;
