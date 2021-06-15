var { poolPromise } = require('../data/dbConn');
var sql = require('mssql');


async function insereEncomenda(userno, artigo, fornec, data, quantidade, estado, desc) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('userno', sql.Numeric, userno)
            .input('artigo', sql.Char, artigo)
            .input('fornec', sql.VarChar, fornec)
            .input('data', sql.DateTime, data)
            .input('quantidade', sql.Int, quantidade)
            .input('estado', sql.Int, estado)
            .input('desc', sql.VarChar, desc)
            .query("INSERT INTO Encomendas (id_utilizador, id_artigo, id_fornecedor, dataEncomenda,quantidade,estado,descriçao)  VALUES (@userno,@artigo,@fornec,@data,@quantidade,@estado,@desc)");
        //console.log(result.recordsets);
        return result.recordsets;
    } catch (error) {
        throw error;
    }
}

async function getEncomendasUtilizador(userno) {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('userno', sql.Numeric, userno)
            .query("SELECT id_encomenda as id,id_utilizador,id_artigo,id_fornecedor,dataEncomenda,quantidade,estado,descriçao FROM Encomendas WHERE id_utilizador=@userno");
        // console.log(result.recordsets[0]);
        return result.recordsets[0];
    } catch (error) {
        throw error;
    }
}


module.exports = {
    insereEncomenda: insereEncomenda,
    getEncomendasUtilizador: getEncomendasUtilizador
}