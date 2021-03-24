var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');


async function getUser(username, passwd) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('passwd', sql.VarChar, passwd)
            .query("SELECT username,userno,grupo,email,ESA FROM us WHERE username = @username AND usercode = @passwd");
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    getUser: getUser
}