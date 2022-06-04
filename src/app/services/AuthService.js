const PersonRepository = require('../repository/PersonRepository');
const bcrypt = require('bcryptjs');
const Person = require('../schema/PersonSchema');

class AuthService {
    async auth(email, password) {
        const person = await PersonRepository.auth(email);

        if (!person) {
            throw new Error('Person not found');
        }

        const validPassword = await bcrypt.compare(password, person.password);
        if (!validPassword) {
            throw new Error('Invalid password');
        }
        person.password = undefined;
        return { person };
    }
}

module.exports = new AuthService();
