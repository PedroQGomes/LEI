const express = require('express');
const router = express.Router();
var constants, { month, formatReceitasinMonth, formatVendasinMonth } = require('../constants');
var authUtils = require('../authUtils');
const moment = require('moment');
const salesService = require('../services/salesService');


router.get('/store/:code', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.code === undefined) {
        res.status(400).send();
        return;
    }
    code = req.params.code;
    //console.log(year)
    salesService.getStoreSalesQtt(code).then((sales) => {
        var vendasArr = [];

        if (sales.length > 0) {
            salesmap = formatVendasArray(sales);
            var vendasObj = {};


            function registrarVendasDoMapa(valor, chave, mapa) {
                vendasObj.arr = valor;
                vendasObj.ano = chave;
                vendasArr.push(vendasObj);
                vendasObj = {};
            }
            salesmap.forEach(registrarVendasDoMapa);
        }


        salesService.getStoreReturns(code).then((returns) => {

            var returnsArr = [];
            if (returns.length > 0) {
                returnsmap = formatRetornosArray(returns);
                var returnsObj = {};


                function registrarReturnsDoMapa(valor, chave, mapa) {
                    returnsObj.arr = valor;
                    returnsObj.ano = chave;
                    returnsArr.push(returnsObj);
                    returnsObj = {};
                }

                returnsmap.forEach(registrarReturnsDoMapa);
            }
            salesService.getStoreSalesValues(code).then((totalsales) => {
                var receitaArr = [];

                if (totalsales.length > 0) {
                    totalsalesmap = formatReceitaArray(totalsales);
                    var receitaObj = {};


                    function registrarReceitaDoMapa(valor, chave, mapa) {
                        receitaObj.arr = valor;
                        receitaObj.ano = chave;
                        receitaArr.push(receitaObj);
                        receitaObj = {};
                    }

                    totalsalesmap.forEach(registrarReceitaDoMapa);
                }

                const final = {
                    "sales": vendasArr,
                    "retornos": returnsArr,
                    "totalsales": receitaArr
                };
                res.status(200).json(final);
            }).catch((err) => {
                console.log(err)
                res.status(404).send("sales not found");
            });


        }).catch((err) => {
            console.log(err)
            res.status(404).send("sales not found");
        });

    }).catch((err) => {
        console.log(err)
        res.status(404).send("sales not found");
    });


});







router.get('/year/:year', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.year === undefined) {
        res.status(400).send();
        return;
    }
    year = req.params.year;
    //console.log(year)

    salesService.getYearSalesValues(year).then((receita) => {

        receitasMonth = formatReceitasinMonth(receita);

        salesService.getYearSalesQtt(year).then((vendas) => {

            vendas = formatVendasinMonth(vendas);
            //console.log(vendas)
            //console.log(receitasMonth)
            res.status(200).json({
                receita: receitasMonth,
                vendas: vendas
            });
        })

    });

});



router.get('/:ref', authUtils.authenticateJWT, (req, res, next) => {
    if (req.params.ref === undefined) {
        res.status(400).send();
        return;
    }
    itemRef = req.params.ref;

    salesService.getItemSalesQtt(itemRef).then((sales) => {
        var allsalesarr = [];

        salesmap = formatVendasArray(sales);

        salesService.getItemReturns(itemRef).then((returns) => {

            allsalesmap = formatRetornosArray(returns, salesmap);
            var allsalesObj = {};


            function registrarReturnsDoMapa(valor, chave, mapa) {
                allsalesObj.arr = valor;
                allsalesObj.ano = chave;
                allsalesarr.push(allsalesObj);
                allsalesObj = {};
            }

            allsalesmap.forEach(registrarReturnsDoMapa);

            salesService.getItemSalesCorlorsNSizes(itemRef).then((topvendas) => {

                salesService.getItemSalesValues(itemRef).then((totalsales) => {
                    var receitaArr = [];

                    if (totalsales.length > 0) {
                        totalsalesmap = formatReceitaArray(totalsales);
                        var receitaObj = {};


                        function registrarReceitaDoMapa(valor, chave, mapa) {
                            receitaObj.arr = valor;
                            receitaObj.ano = chave;
                            receitaArr.push(receitaObj);
                            receitaObj = {};
                        }

                        totalsalesmap.forEach(registrarReceitaDoMapa);
                    }

                    const final = {
                        "sales": allsalesarr,
                        "topvendas": topvendas,
                        "totalsales": receitaArr
                    };
                    res.status(200).json(final);
                }).catch((err) => {
                    console.log(err)
                    res.status(404).send("sales not found");
                });

            }).catch((err) => {

                res.status(404).send("sales not found");
            });
        }).catch((err) => {
            console.log(err)
            res.status(404).send("sales not found");
        });

    }).catch((err) => {
        //console.log(err)
        res.status(404).send("sales not found");
    });
});







const formatReceitaArray = (array) => {
    myMap = new Map()

    for (var i = 0; i < array.length; i++) {
        entry = array[i];
        if (myMap.get(entry.ano) === undefined) {
            myMap.set(entry.ano, [{ mes: 1, receita: 0 }, { mes: 2, receita: 0 }, { mes: 3, receita: 0 }, { mes: 4, receita: 0 }, { mes: 5, receita: 0 }, { mes: 6, receita: 0 },
                { mes: 7, receita: 0 }, { mes: 8, receita: 0 }, { mes: 9, receita: 0 }, { mes: 10, receita: 0 }, { mes: 11, receita: 0 }, { mes: 12, receita: 0 }
            ]);
        }
        myMap.get(entry.ano)[entry.mes - 1].receita = entry.receita;
    }
    //console.log(myMap)
    return myMap
}

const formatVendasArray = (array) => {
    myMap = new Map()

    for (var i = 0; i < array.length; i++) {
        entry = array[i];
        if (myMap.get(entry.ano) === undefined) {
            myMap.set(entry.ano, [{ mes: 1, vendas: 0, retornos: 0 }, { mes: 2, vendas: 0, retornos: 0 }, { mes: 3, vendas: 0, retornos: 0 }, { mes: 4, vendas: 0, retornos: 0 }, { mes: 5, vendas: 0, retornos: 0 }, { mes: 6, vendas: 0, retornos: 0 },
                { mes: 7, vendas: 0, retornos: 0 }, { mes: 8, vendas: 0, retornos: 0 }, { mes: 9, vendas: 0, retornos: 0 }, { mes: 10, vendas: 0, retornos: 0 }, { mes: 11, vendas: 0, retornos: 0 }, { mes: 12, vendas: 0, retornos: 0 }
            ]);
        }
        myMap.get(entry.ano)[entry.mes - 1].vendas = entry.vendas;
    }
    //console.log(myMap)
    return myMap
}

const formatRetornosArray = (array, myMap) => {
    for (var i = 0; i < array.length; i++) {
        entry = array[i];
        if (myMap.get(entry.ano) === undefined) {
            myMap.set(entry.ano, [{ mes: 1, retornos: 0 }, { mes: 2, retornos: 0 }, { mes: 3, retornos: 0 }, { mes: 4, retornos: 0 }, { mes: 5, retornos: 0 }, { mes: 6, retornos: 0 },
                { mes: 7, retornos: 0 }, { mes: 8, retornos: 0 }, { mes: 9, retornos: 0 }, { mes: 10, retornos: 0 }, { mes: 11, retornos: 0 }, { mes: 12, retornos: 0 }
            ]);
        }
        myMap.get(entry.ano)[entry.mes - 1].retornos = entry.retornos;
    }
    //console.log(myMap)
    return myMap
}


















module.exports = router;