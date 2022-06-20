const mongoose = require('mongoose');
const config = require('../../../config/config');
require('dotenv').config();

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        return mongoose.connect(
            `mongodb+srv://deploy:Im0aEUaO74x2kPHJ@cluster0.9im5y.mongodb.net/?retryWrites=true&w=majority`
        );
    }

    disconnect() {
        return mongoose.connection.close();
    }
}
module.exports = new Database().connect();
