const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const PersonRepository = require('../repository/PersonRepository');
require('dotenv').config();

class AuthService {
  async auth(email, password) {
    const person = await PersonRepository.auth(email);

    if (!person) {
      throw new Unauthorized(`${email} not found. Try again.`);
    }

    const validPassword = await bcrypt.compare(password, person.password);
    if (!validPassword) {
      throw new Unauthorized(`Invalid password. Try again.`);
    }
    person.password = undefined;

    const token = jwt.sign({ id: person.id }, process.env.SECRET, {
      expiresIn: 86400
    });

    return { token, email: person.email, canDrive: person.canDrive };
  }
}

module.exports = new AuthService();
