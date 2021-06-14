var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');



async function getItemSalesQtt(ref) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .query("select  ano = YEAR(datalc),mes = MONTH(datalc),SUM (qtt) AS vendas from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND qtt >0 GROUP BY YEAR(datalc),MONTH(datalc) ORDER BY  YEAR(datalc),MONTH(datalc)  ASC");
        //console.log(result.recordsets[0]);
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


async function getItemSalesQttInDates(ref, data1, data2) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ref', sql.VarChar, ref)
            .input('data1', sql.DateTime, data1)
            .input('data2', sql.DateTime, data2)
            //console.log(result.recordsets[0]);
            .query("select datalc,SUM (qtt) AS vendas from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND datalc > @data1 AND datalc < @data2 GROUP BY datalc ORDER BY datalc ASC");
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
            .query("select ano = YEAR(datalc),mes = MONTH(datalc),ABS(SUM (qtt)) AS retornos from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND qtt < 0 GROUP BY YEAR(datalc),MONTH(datalc) ORDER BY  YEAR(datalc),MONTH(datalc)  ASC");
        //console.log(result.recordsets[0]);
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
            .query("select ano = YEAR(datalc),mes = MONTH(datalc),SUM(ETT) AS receita from sl where sl.ref=@ref and armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0  AND ETT > 0 GROUP BY YEAR(datalc),MONTH(datalc) ORDER BY  YEAR(datalc),MONTH(datalc)  ASC");
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
            .query("SELECT SUM(qtt) AS qtt,cor,tam FROM sl Where ref =@ref and sl.cm > 50 and sl.trfa = 0 and cor != '' and tam != '' GROUP BY cor,tam ORDER BY qtt DESC");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}


async function getYearSalesQtt(year) {
    firstdate = new Date(year, 0, 1);
    lastdate = new Date(year, 11, 31);
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('firstdate', sql.DateTime, firstdate)
            .input('lastdate', sql.DateTime, lastdate)
            .query("select mes = DATEPART(MONTH, datalc),SUM (qtt) AS vendas from sl where armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND qtt > 0  AND datalc >= @firstdate AND datalc <= @lastdate GROUP BY (DATEPART(MONTH, datalc)) ORDER BY (DATEPART(MONTH, datalc)) ASC");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function getYearSalesReturns(year) {
    firstdate = new Date(year, 0, 1);
    lastdate = new Date(year, 11, 31);
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('firstdate', sql.DateTime, firstdate)
            .input('lastdate', sql.DateTime, lastdate)
            .query("select datalc,SUM (qtt) AS retornos from sl where armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0 AND qtt < 0  AND datalc >= @firstdate AND datalc <= @lastdate GROUP BY datalc ORDER BY datalc ASC");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function getYearSalesValues(year) {
    firstdate = new Date(year, 0, 1);
    lastdate = new Date(year, 11, 31);
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('firstdate', sql.DateTime, firstdate)
            .input('lastdate', sql.DateTime, lastdate)
            .query("select mes = DATEPART(MONTH, datalc),SUM(ETT) AS receita from sl where armazem in (9,10,11,132,200,201,900) and sl.cm >50 and sl.trfa = 0  AND datalc >=@firstdate  AND datalc <=@lastdate  and ETT > 0 GROUP BY (DATEPART(MONTH, datalc)) ORDER BY (DATEPART(MONTH, datalc)) ASC");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getItemSalesQtt: getItemSalesQtt,
    getItemSalesQttInDates: getItemSalesQttInDates,
    getItemReturns: getItemReturns,
    getItemSalesCorlorsNSizes: getItemSalesCorlorsNSizes,
    getItemSalesValues: getItemSalesValues,
    getYearSalesQtt: getYearSalesQtt,
    getYearSalesValues: getYearSalesValues,
    getYearSalesReturns: getYearSalesReturns

}