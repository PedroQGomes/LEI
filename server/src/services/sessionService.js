var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');
var constants = require('../constants');

async function saveJwtToken(token, userno, ip) {
    try {
        let revoked = 0;
        let expires = GetFormattedDate(new Date(Date.now() + constants.refreshCookie));
        let issued = GetFormattedDate(new Date(Date.now()));

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userno', sql.VarChar, userno)
            .input('token', sql.VarChar, token)
            .input('ip', sql.VarChar, ip)
            .input('expires', sql.VarChar, expires)
            .input('issued', sql.VarChar, issued)
            .query("INSERT INTO UserSession (RefreshToken, IpAddress, UserId,issued,expires) VALUES(@token,@ip,@userno,@issued,@expires)");
        //console.log(result);
        return;
    } catch (error) {
        throw error;
    }
}



async function verifyJwt(token, userno) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('userno', sql.VarChar, userno)
            .input('token', sql.VarChar, token)
            .query("SELECT * FROM UserSession WHERE UserId = @userno AND RefreshToken = @token");
        //console.log(result);
        return result.recordsets[0];
    } catch (error) {
        throw error;
    }
}

async function revokeJWT(token, userno) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('userno', sql.VarChar, userno)
            .input('token', sql.VarChar, token)
            .query("DELETE FROM UserSession WHERE UserId = @userno AND RefreshToken = @token");
    } catch (error) {
        throw error;
    }
}



function GetFormattedDate(date) {
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + (date.getDate())).slice(-2);
    var year = date.getFullYear();
    var hour = ("0" + (date.getHours())).slice(-2);
    var min = ("0" + (date.getMinutes())).slice(-2);
    var seg = ("0" + (date.getSeconds())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seg;
}



module.exports = {
    saveJwtToken: saveJwtToken,
    verifyJwt: verifyJwt,
    revokeJWT: revokeJWT
}