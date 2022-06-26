const moment = require('moment');
const ReserveRepository = require('../../repository/ReserveRepository');

class ReserveUtils {
  async sameDayCarReserve(id_car, data_start, data_end) {
    const result = await ReserveRepository.list({
      id_car,
      data_start,
      data_end
    });

    result.reserves.forEach((reserve) => {
      throw new Error(
        `The car is already booked, it was booked for the date ${reserve.data_start} to the date ${reserve.data_end}`
      );
    });
  }

  async validDate(data_start, data_end) {
    const dataStart = moment(data_start, 'DD/MM/YYYY').isSameOrBefore(moment(data_end, 'DD/MM/YYYY'), 'days');
    if (!dataStart) throw new Error('Data_start must be before than the Data_end');

    const dataEnd = moment(data_end, 'DD/MM/YYYY').isSameOrAfter(moment(data_start, 'DD/MM/YYYY'), 'days');
    if (!dataEnd) throw new Error('Data_end must be after than the Data_start');
  }
}

module.exports = new ReserveUtils();
