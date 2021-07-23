var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');
var constants = require('../constants');

async function getItemByRef(itemRef, page) {
    try {
        itemRef = itemRef + "%";
        const pool = await poolPromise
        const result = await pool.request()
            .input('itemRef', sql.VarChar, itemRef)
            .input('page', sql.Int, page)
            .input('rows', sql.Int, constants.pagesize)
            .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE ref like @itemRef ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY");
        //.query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE design = 
        // @nome ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY");
        //console.log(result.recordsets);
        return result.recordsets[0];
    } catch (error) {
        console.error(error);
    }
}

async function getStockOfStore(code) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('code', sql.Numeric, code)
            .query("SELECT ref AS id,stock FROM sa WHERE armazem = @code AND stock > 0 ORDER BY stock DESC");
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
            .query("SELECT  armazem,sum(stock) as stock FROM sx WHERE sx.ref =@itemRef AND armazem in (9,10,11,132,200,201) and stock > 0 GROUP BY armazem ORDER BY armazem");
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
            //console.log(result.recordsets[0]);
            .query("SELECT  ref,stock,armazem,cor,tam FROM sx WHERE sx.ref = @itemRef AND armazem in (9,10,11,132,200,201)  AND stock > 0 ORDER BY cor,armazem");
        return result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}




async function getItemByName(nome, page, year) {
    if (year === undefined) {
        try {
            nome = nome + "%";
            const pool = await poolPromise
            const result = await pool.request()
                .input('nome', sql.VarChar, nome)
                .input('page', sql.Int, page)
                .input('rows', sql.Int, constants.pagesize)
                .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE design like @nome ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY");
            //console.log(result.recordsets);
            return result.recordsets[0];
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            year = year.toString().substr(-2)
            nome = nome + "%";
            const pool = await poolPromise
            const result = await pool.request()
                .input('nome', sql.VarChar, nome)
                .input('page', sql.Int, page)
                .input('year', sql.VarChar, year)
                .input('rows', sql.Int, constants.pagesize)
                .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE design like @nome AND usr3=@year ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY");
            //console.log(result.recordsets);
            return result.recordsets[0];
        } catch (error) {
            console.error(error);
        }
    }

}



async function getItemBycategory(categ, page, year) {

    if (year === undefined) {
        try {
            categ = categ + "%";
            const pool = await poolPromise
            const result = await pool.request()
                .input('categ', sql.VarChar, categ)
                .input('page', sql.Int, page)
                .input('rows', sql.Int, constants.pagesize)
                .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE usr1 like @categ ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY ");
            //console.log(result.recordsets)
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            year = year.toString().substr(-2)
            categ = categ + "%";
            const pool = await poolPromise
            const result = await pool.request()
                .input('categ', sql.VarChar, categ)
                .input('year', sql.VarChar, year)
                .input('page', sql.Int, page)
                .input('rows', sql.Int, constants.pagesize)
                .query("SELECT ref,design,usr1,usr5,opendata,imagem,COUNT(*) OVER() AS total from st WHERE usr1 like @categ AND usr3 =@year ORDER BY ref DESC OFFSET (@page * @rows) ROWS FETCH NEXT @rows ROWS ONLY ");
            //console.log(result.recordsets)
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
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

/*
CREATE PROCEDURE stocksOf5items @itemRef VarChar(45),@itemRef2 VarChar(45),@itemRef3 VarChar(45),@itemRef4 VarChar(45),@itemRef5 VarChar(45)

AS

BEGIN

	SELECT armazem,sum(stock) as stock FROM sx WHERE sx.ref =@itemRef AND armazem in (9,10,11,132,200,201) and stock > 0 GROUP BY armazem ORDER BY armazem;

	SELECT armazem,sum(stock) as stock FROM sx WHERE sx.ref =@itemRef2 AND armazem in (9,10,11,132,200,201) and stock > 0 GROUP BY armazem ORDER BY armazem;
	
	SELECT armazem,sum(stock) as stock FROM sx WHERE sx.ref =@itemRef3 AND armazem in (9,10,11,132,200,201) and stock > 0 GROUP BY armazem ORDER BY armazem;

	SELECT armazem,sum(stock) as stock FROM sx WHERE sx.ref =@itemRef4 AND armazem in (9,10,11,132,200,201) and stock > 0 GROUP BY armazem ORDER BY armazem;

	SELECT armazem,sum(stock) as stock FROM sx WHERE sx.ref =@itemRef5 AND armazem in (9,10,11,132,200,201) and stock > 0 GROUP BY armazem ORDER BY armazem;

END ; */

module.exports = {
    getItemByRef: getItemByRef,
    getItemBycategory: getItemBycategory,
    getItemByName: getItemByName,
    getItemStockInStores: getItemStockInStores,
    getItemByCollersAndSizes: getItemByCollersAndSizes,
    getItemByRefAllData: getItemByRefAllData,
    get5ItemsStockInStores: get5ItemsStockInStores,
    getStockOfStore: getStockOfStore
}