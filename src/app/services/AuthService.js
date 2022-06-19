const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PersonRepository = require('../repository/PersonRepository');
const authConfig = require('../../config/auth.json');

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

        const token = jwt.sign({ id: person.id }, authConfig.secret, {
            expiresIn: 86400
        });

        return { token, email: person.email, canDrive: person.canDrive };
    }
}

module.exports = new AuthService();
