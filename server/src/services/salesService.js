var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');



async function getItemSales(ref) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .query("select datalc,SUM (qtt) AS qtt,MAX(ETT) AS ETT from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND qtt >0 GROUP BY datalc ORDER BY datalc ASC");
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
            .query("select datalc,SUM (qtt) AS qtt,MAX(ETT) AS ETT from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND datalc > @data1 AND datalc < @data2 GROUP BY datalc ORDER BY datalc ASC");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




async function getItemReturns(ref) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .query("select datalc,ABS(SUM (qtt)) AS qtt,MAX(ETT) AS ETT from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND qtt < 0 GROUP BY datalc ORDER BY datalc ASC");
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}



async function getItemSalesCorlorsNSizes(ref) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .query("SELECT SUM(qtt) AS qtt,cor,tam FROM sl Where ref =@ref and sl.cm > 50 and sl.trfa = 0 and cor != '' and tam != '' GROUP BY cor,tam");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




async function getItemSalesValues(ref) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .query("SELECT SUM(qtt) AS qtt,cor,tam FROM sl Where ref = 'PV21SN91202' and sl.cm >50 and sl.trfa = 0 and cor != '' and tam != '' GROUP BY cor,tam");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getItemSales: getItemSales,
    getItemSalesInDates: getItemSalesInDates,
    getItemReturns: getItemReturns,
    getItemSalesCorlorsNSizes: getItemSalesCorlorsNSizes,
    getItemSalesValues: getItemSalesValues

}