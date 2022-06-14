const app = require('./app');
const dotenv = require('dotenv').config;

const port = process.env.DB_PORT || 3000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
