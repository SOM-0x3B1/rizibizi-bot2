const { createPool } = require('mysql');
const { dbpassword } = require('./config.json');

const pool = createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'rizibizi',
    password: dbpassword,
    database: 'rizibizi',
    dateStrings: 'date',
});

module.exports = {
    getPool: () => {
        return pool;
    },
};