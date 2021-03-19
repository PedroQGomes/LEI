var { poolPromise } = require('./dbConn');
var sql = require('mssql');

async function getItemByRef(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("SELECT * from us WHERE usstamp = @itemRef");
        //console.log(result.recordsets);
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}



async function testeUser(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query("SELECT * from us WHERE usstamp = @itemRef");
        //console.log(result.recordsets);
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getItemByRef: getItemByRef
}