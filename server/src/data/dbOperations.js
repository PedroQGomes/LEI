var { poolPromise } = require('./dbConn');
var sql = require('mssql');

async function getItemByRef(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("SELECT ref,design,fornecedor,fornec,desc2,usr1,usr2,usr3,usr4,usr5 from st WHERE ref = @itemRef");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function getItemByName(nome) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('nome', sql.VarChar, nome)
            .query("SELECT ref,design,fornecedor,fornec,desc2,usr1,usr2,usr3,usr4,usr5 from st WHERE design = @nome");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}



async function getItemBycategory(categ) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('categ', sql.VarChar, categ)
            .query("SELECT ref,design,fornecedor,fornec,desc2,usr1,usr2,usr3,usr4,usr5 from st WHERE usr1 = @categ");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    getItemByRef: getItemByRef,
    getItemBycategory: getItemBycategory,
    getItemByName: getItemByName
}