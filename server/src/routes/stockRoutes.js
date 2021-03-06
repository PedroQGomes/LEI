const express = require('express');
const router = express.Router();
var { lojasDefault, formatLojasDefault, formatLojasColorsNSizes, pagesize } = require('../constants');
var authUtils = require('../authUtils');
const stockService = require('../services/stockService');

router.get('/store/:code', authUtils.authenticateJWT, (req, res, next) => {

    // pesquisa por artigos de um dado nome
    if (req.params.code === undefined) {
        res.status(400).send();
        return;
    }

    var code = req.params.code;
    //console.log(name);
    stockService.getStockOfStore(code).then((results) => {
        res.status(200).send(results);
    });


});





// exemplo = localhost:5000/item/category/VESTIDOS - 1600  
router.get('/category/:cat', authUtils.authenticateJWT, (req, res, next) => {
    if (req.params.cat === undefined) {
        res.status(400).send();
        return;
    }
    var year = req.query.year;

    var page = req.query.page;

    if (page === undefined) {
        page = 0;
    }

    var type = req.query.type;

    var categ = req.params.cat;
    stockService.getItemBycategory(categ, page, year, type).then((results) => { // no maximo da 5 resultados -- page size
        var tamanho = results.length;
        if (results.length === 0) {
            res.status(404).send();
            return;
        }

        for (j = results.length; j < pagesize; j++) {
            results.push({ ref: "" });
        }
        const finalArr = [];

        stockService.get5ItemsStockInStores(results[0].ref, results[1].ref, results[2].ref, results[3].ref, results[4].ref).then((stocks) => {
            for (i = 0; i < tamanho; i++) {
                lojas = {...lojasDefault };
                totalStock = 0;
                lojas, totalStock = formatLojasDefault(lojas, stocks[i], totalStock);

                finalArr[i] = {
                    info: results[i],
                    stock: lojas,
                    totalStock: totalStock
                }

            }
            res.status(200).json({
                totalresults: results[0].total,
                totalpages: Math.ceil(results[0].total / pagesize),
                content: finalArr
            });

        });

    });

});

//  exemplo = localhost:5000/item/name/TUNICA N??VOA
router.get('/name/:name', authUtils.authenticateJWT, (req, res, next) => {

    // pesquisa por artigos de um dado nome
    if (req.params.name === undefined) {
        res.status(400).send();
        return;
    }
    var year = req.query.year;

    var page = req.query.page;

    if (req.query.page === undefined) {
        page = 0;
    }

    var type = req.query.type;
    var name = req.params.name;
    //console.log(name);
    stockService.getItemByName(name, page, year, type).then((results) => {
        var tamanho = results.length;
        if (results.length === 0) {
            res.status(404).send();
            return;
        }

        for (j = results.length; j < pagesize; j++) {
            results.push({ ref: "" });
        }
        const finalArr = [];

        stockService.get5ItemsStockInStores(results[0].ref, results[1].ref, results[2].ref, results[3].ref, results[4].ref).then((stocks) => {
            for (i = 0; i < tamanho; i++) {
                lojas = {...lojasDefault };
                totalStock = 0;
                lojas, totalStock = formatLojasDefault(lojas, stocks[i], totalStock);

                finalArr[i] = {
                    info: results[i],
                    stock: lojas,
                    totalStock: totalStock
                }

            }
            res.status(200).json({
                totalresults: results[0].total,
                totalpages: Math.ceil(results[0].total / pagesize),
                content: finalArr
            });

        });
    });


});


router.get('/:id/fullstats', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.id === undefined) {
        res.status(400).send();
        return;
    }

    var itemRef = req.params.id;

    stockService.getItemByRefAllData(itemRef).then((results) => {
        if (results.length > 0) {
            stockService.getItemByCollersAndSizes(itemRef).then((colors) => {
                var myMap = new Map();
                totalStock = 0;
                myMap, totalStock = formatLojasColorsNSizes(myMap, colors, totalStock);

                var coresEtamanhos = {};
                var coresEtamanhosArr = [];

                function registrarElementosDoMapa(valor, chave, mapa) {
                    coresEtamanhos.lojas = valor;
                    coresEtamanhos.cor = chave;
                    coresEtamanhosArr.push(coresEtamanhos);
                    coresEtamanhos = {};
                }
                myMap.forEach(registrarElementosDoMapa);
                const final = {
                    "info": results[0],
                    "stock": coresEtamanhosArr,
                    "totalStock": totalStock,
                };
                res.status(200).json(final);

            }).catch((err) => {
                res.status(404).send("sizes and colors not found");
            });

        } else {
            res.status(404).send("id not found");
        }

    })

});






// exemplo = localhost:5000/item/PV18SN91645
router.get('/:id', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.id === undefined) {
        res.status(400).send();
        return;
    }

    var page = req.query.page;

    if (req.query.page === undefined) {
        page = 0;
    }


    var type = req.query.type;

    var itemRef = req.params.id;

    stockService.getItemByRef(itemRef, page, type).then((results) => {

        var tamanho = results.length;
        if (results.length === 0) {
            res.status(404).send();
            return;
        }

        for (j = results.length; j < pagesize; j++) {
            results.push({ ref: "" });
        }
        const finalArr = [];

        stockService.get5ItemsStockInStores(results[0].ref, results[1].ref, results[2].ref, results[3].ref, results[4].ref).then((stocks) => {
            for (i = 0; i < tamanho; i++) {
                lojas = {...lojasDefault };
                totalStock = 0;
                lojas, totalStock = formatLojasDefault(lojas, stocks[i], totalStock);

                finalArr[i] = {
                    info: results[i],
                    stock: lojas,
                    totalStock: totalStock
                }

            }
            res.status(200).json({
                totalresults: results[0].total,
                totalpages: Math.ceil(results[0].total / pagesize),
                content: finalArr
            });

        });

    })


});






module.exports = router;