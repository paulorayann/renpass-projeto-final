const moment = require('moment');
moment.suppressDeprecationWarnings = true;

function getAge(birthday) {
    const todaysDate = moment();
    const formatDate = moment(todaysDate, 'DD/MM/YYYY').format('YYYY/MM/DD');
    const overAge = moment(formatDate).diff(birthday, 'years');

    if (overAge < 18) {
        throw new Error('User must be at least 18');
    }
    return true;
}
module.exports = getAge;
