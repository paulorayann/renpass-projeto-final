const mongoose = require('mongoose');
const config = require('../../../config/config');
require('dotenv').config();

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        return mongoose.connect(
            process.env.MONGO_URL ||
                `mongodb://${config.database.host}/${config.database.collection}`
        );
    }

    disconnect() {
        return mongoose.connection.close();
    }
}
module.exports = new Database().connect();
