require('dotenv').config()

const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSW,
    server: process.env.DB_IP,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    options: {
        trustedconnection: true,
        enableArithAbort: true,
    }
}

module.exports = config;