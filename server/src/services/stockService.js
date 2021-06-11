var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');
var constants = require('../constants');

async function getItemByRef(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("SELECT ref,design,usr1,usr5,opendata,imagem from st WHERE ref = @itemRef");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function getItemByRefAllData(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("SELECT ref,design,fornecedor,fornec,desc2,usr1,usr2,usr3,usr4,usr5,imagem from st WHERE ref = @itemRef");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}



async function getItemStockInStores(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("select armazem,stock from sa where sa.ref=@itemRef  and armazem in (9,10,11,132,200,201)");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function get5ItemsStockInStores(itemRef, itemRef2, itemRef3, itemRef4, itemRef5) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .input('itemRef2', sql.VarChar, itemRef2)
            .input('itemRef3', sql.VarChar, itemRef3)
            .input('itemRef4', sql.VarChar, itemRef4)
            .input('itemRef5', sql.VarChar, itemRef5)
            .execute('stocksOf5items')
            //console.log(result.recordsets);
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}




async function getItemByCollersAndSizes(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("SELECT  ref,stock,armazem,cor,tam FROM sx WHERE sx.ref = @itemRef AND armazem in (9,10,11,132,200,201)  AND stock > 0 ORDER BY cor,armazem");
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




async function getItemByName(nome, page) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('nome', sql.VarChar, nome)
            .input('page', sql.Int, page)
            .input('rows', sql.Int, constants.pagesize)
            .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE design = @nome ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}



async function getItemBycategory(categ, page) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('categ', sql.VarChar, categ)
            .input('page', sql.Int, page)
            .input('rows', sql.Int, constants.pagesize)
            .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE usr1 = @categ ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY ");
        //console.log(result.recordsets)
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


/**
CREATE PROCEDURE stocksOf5items @itemRef VarChar(45),@itemRef2 VarChar(45),@itemRef3 VarChar(45),@itemRef4 VarChar(45),@itemRef5 VarChar(45)

AS

BEGIN

    select armazem,stock from sa where sa.ref=@itemRef  and armazem in (9,10,11,132,200,201) ;

	select armazem,stock from sa where sa.ref=@itemRef2  and armazem in (9,10,11,132,200,201);

    select armazem,stock from sa where sa.ref=@itemRef3  and armazem in (9,10,11,132,200,201);

    select armazem,stock from sa where sa.ref=@itemRef4  and armazem in (9,10,11,132,200,201);

    select armazem,stock from sa where sa.ref=@itemRef5  and armazem in (9,10,11,132,200,201);
END ;
 */

module.exports = {
    getItemByRef: getItemByRef,
    getItemBycategory: getItemBycategory,
    getItemByName: getItemByName,
    getItemStockInStores: getItemStockInStores,
    getItemByCollersAndSizes: getItemByCollersAndSizes,
    getItemByRefAllData: getItemByRefAllData,
    get5ItemsStockInStores: get5ItemsStockInStores
}