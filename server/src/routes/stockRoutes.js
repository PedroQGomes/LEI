const express = require('express');
const router = express.Router();
var constants = require('../constants');
var authUtils = require('../authUtils');
const stockService = require('../services/stockService');


// exemplo = localhost:5000/item/category/VESTIDOS - 1600  
router.get('/category/:cat', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.cat === undefined) {
        res.status(400).send();
    }

    var categ = req.params.cat;
    stockService.getItemBycategory(categ).then((results) => {
        res.status(200).json({
            totalresults: results.length,
            totalpages: Math.ceil(results.length / constants.pagesize),
            content: results.slice(0, constants.pagesize)
        });
    });

});

//  exemplo = localhost:5000/item/name/TUNICA NÉVOA
router.get('/name/:name', authUtils.authenticateJWT, (req, res, next) => {

    // pesquisa por artigos de um dado nome
    if (req.params.name === undefined) {
        res.status(400).send();
    }

    var name = req.params.name;
    //console.log(name);
    stockService.getItemByName(name).then((results) => {
        res.status(200).json(results);
    });


});


router.get('/:id/fullstats', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.id === undefined) {
        res.status(400).send();
    }

    var itemRef = req.params.id;

    stockService.getItemByRefAllData(itemRef).then((results) => {
        if (results.length > 0) {
            stockService.getItemByCollersAndSizes(itemRef).then((colors) => {
                var myMap = new Map();
                totalStock = 0;
                const lojas = {
                    "barcelos": "",
                    "viana": "",
                    "guima": "",
                    "santander": "",
                    "leiria": "",
                    "caldas": "",
                }

                for (var i = 0; i < colors.length; i++) {

                    var obj = colors[i];
                    if (myMap.get(obj.cor) === undefined) {
                        let value = {
                            ...lojas,
                            totalStockBarcelos: 0,
                            totalStockViana: 0,
                            totalStockBGuima: 0,
                            totalStockSantander: 0,
                            totalStockLeiria: 0,
                            totalStockCaldas: 0,
                        };
                        myMap.set(obj.cor, value);
                        //console.log(myMap.get(obj.cor));
                    }
                    var tmp = "";
                    switch (obj.armazem) {

                        case 9:
                            obj.stock > 1 ? tmp = obj.stock : tmp = ""
                            myMap.get(obj.cor).totalStockBarcelos += obj.stock;
                            myMap.get(obj.cor).barcelos = myMap.get(obj.cor).barcelos.concat(tmp).concat(obj.tam, ",");

                            break;
                        case 10:

                            obj.stock > 1 ? tmp = obj.stock : tmp = ""
                            myMap.get(obj.cor).totalStockViana += obj.stock;
                            myMap.get(obj.cor).viana = myMap.get(obj.cor).viana.concat(tmp).concat(obj.tamanho, ",");
                            break;
                        case 11:

                            obj.stock > 1 ? tmp = obj.stock : tmp = ""
                            myMap.get(obj.cor).totalStockBGuima += obj.stock;
                            myMap.get(obj.cor).guima = myMap.get(obj.cor).guima.concat(tmp).concat(obj.tam, ",");
                            break;
                        case 132:

                            obj.stock > 1 ? tmp = obj.stock : tmp = ""
                            myMap.get(obj.cor).totalStockSantander += obj.stock;
                            myMap.get(obj.cor).santander = myMap.get(obj.cor).santander.concat(tmp).concat(obj.tam, ",");
                            break;
                        case 200:

                            obj.stock > 1 ? tmp = obj.stock : tmp = ""
                            myMap.get(obj.cor).totalStockLeiria += obj.stock;
                            myMap.get(obj.cor).leiria = myMap.get(obj.cor).leiria.concat(tmp).concat(obj.tam, ",");
                            break;
                        case 201:

                            obj.stock > 1 ? tmp = obj.stock : tmp = ""
                            myMap.get(obj.cor).totalStockCaldas += obj.stock;
                            myMap.get(obj.cor).caldas = myMap.get(obj.cor).caldas.concat(tmp).concat(obj.tam, ",");
                            break;

                        default:
                            console.log("localizaçao desconhecida");
                    }
                    totalStock += obj.stock
                }

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
    }

    var itemRef = req.params.id;

    stockService.getItemByRef(itemRef).then((results) => {
        if (results.length > 0) {
            stockService.getItemStockInStores(itemRef).then((stores) => {
                let totalStock = 0;
                const lojas = {
                    "barcelos": 0,
                    "viana": 0,
                    "guima": 0,
                    "santander": 0,
                    "leiria": 0,
                    "caldas": 0,
                }

                for (var i = 0; i < stores.length; i++) {
                    var obj = stores[i];
                    switch (obj.armazem) {
                        case 9:
                            lojas.barcelos = obj.stock
                            break;
                        case 10:
                            lojas.viana = obj.stock
                            break;
                        case 11:
                            lojas.guima = obj.stock
                            break;
                        case 132:
                            lojas.santander = obj.stock
                            break;
                        case 200:
                            lojas.leiria = obj.stock
                            break;
                        case 201:
                            lojas.caldas = obj.stock
                            break;

                        default:
                            console.log("localizaçao desconhecida");
                    }

                    totalStock += obj.stock
                }
                const final = {
                    "info": results[0],
                    "stock": lojas,
                    "totalStock": totalStock
                };
                res.status(200).json(final);
            }).catch((err) => {
                res.status(404).send("id not found");
            })

        } else {
            res.status(404).send("id not found");
        }

    })


});








module.exports = router;