function getAge(birthday) {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);

    return birthday <= today;
}
module.exports = getAge;
