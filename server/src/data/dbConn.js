const config = require('./dbconfig');
const sql = require("mssql");

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! ', err))

module.exports = {
    sql,
    poolPromise
}