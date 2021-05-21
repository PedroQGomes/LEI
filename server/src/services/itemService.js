var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');

async function getItemByRef(itemRef) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .query("SELECT ref,design,usr1,usr5,opendata from st WHERE ref = @itemRef");
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
            .query("SELECT ref,design,fornecedor,fornec,desc2,usr1,usr2,usr3,usr4,usr5 from st WHERE ref = @itemRef");
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

async function getItemSales(ref) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .query("select datalc,SUM (qtt) AS qtt,MAX(ETT) AS ETT from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201) and sl.cm >50 and sl.trfa = 0 GROUP BY datalc ORDER BY datalc ASC");
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


async function getItemSalesInDates(ref, data1, data2) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .input('data1', sql.DateTime, data1)
            .input('data2', sql.DateTime, data2)
            //console.log(result.recordsets[0]);
            .query("select datalc,SUM (qtt) AS qtt,MAX(ETT) AS ETT from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201) and sl.cm >50 and sl.trfa = 0 AND datalc > @data1 AND datalc < @data2 GROUP BY datalc ORDER BY datalc ASC");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    getItemByRef: getItemByRef,
    getItemBycategory: getItemBycategory,
    getItemByName: getItemByName,
    getItemStockInStores: getItemStockInStores,
    getItemByCollersAndSizes: getItemByCollersAndSizes,
    getItemByRefAllData: getItemByRefAllData,
    getItemSales: getItemSales,
    getItemSalesInDates: getItemSalesInDates
}