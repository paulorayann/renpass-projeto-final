const mongoose = require('mongoose');
const config = require('../../../config/config');

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        return mongoose.connect(
            `mongodb://${config.database.host}/${config.database.collection}`,
            {
                user: config.database.username,
                pass: config.database.password
            }
        );
    }
    disconnect() {
        return mongoose.connection.close();
    }
}
module.exports = new Database().connect();
