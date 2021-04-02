var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');


async function loginUser(username, passwd) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('passwd', sql.VarChar, passwd)
            .query("SELECT username,userno,ESA FROM us WHERE username = @username AND usercode = @passwd");
        //console.log(result.recordsets[0]);
        return result.recordsets[0][0];
    } catch (error) {
        throw error;
    }
}

async function getUser(userno) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('userno', sql.VarChar, userno)
            .query("SELECT username,userno,grupo,email,ESA FROM us WHERE userno = @userno ");
        // console.log(result.recordsets[0]);
        return result.recordsets[0][0];
    } catch (error) {
        throw error;
    }
}




module.exports = {
    getUser: getUser,
    loginUser: loginUser
}