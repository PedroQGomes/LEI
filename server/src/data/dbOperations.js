var { poolPromise } = require('./dbConn');

async function testequerybd() {
    try {
        const pool = await poolPromise
        const result = await pool.request().query("SELECT * from us WHERE usstamp = 'ADM07041241822,942852511'");
        console.log(result.recordsets);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    testequerybd: testequerybd
}