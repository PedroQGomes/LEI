const express = require('express');
const router = express.Router();
var constants, { month, formatReceitasinMonth, formatVendasinMonth } = require('../constants');
var authUtils = require('../authUtils');
const moment = require('moment');
const salesService = require('../services/salesService');



router.get('/year/:year', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.year === undefined) {
        res.status(400).send();
    }
    year = req.params.year;
    console.log(year)

    salesService.getYearSalesValues(year).then((receita) => {

        receitasMonth = formatReceitasinMonth(receita);

        salesService.getYearSalesQtt(year).then((vendas) => {

            vendas = formatVendasinMonth(vendas);
            console.log(vendas)
            console.log(receitasMonth)
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
    }
    itemRef = req.params.ref;


    salesService.getItemSalesQtt(itemRef).then((sales) => {
        sales = formatDateArray(sales);

        salesService.getItemReturns(itemRef).then((returns) => {

            returns = formatDateArray(returns);


            salesService.getItemSalesCorlorsNSizes(itemRef).then((topvendas) => {

                salesService.getItemSalesValues(itemRef).then((totalsales) => {
                    totalsales = formatDateArray(totalsales);

                    const final = {
                        "sales": sales,
                        "retornos": returns,
                        "topvendas": topvendas,
                        "totalsales": totalsales
                    };
                    res.status(200).json(final);
                }).catch((err) => {
                    res.status(404).send("sales not found");
                });

            }).catch((err) => {
                res.status(404).send("sales not found");
            });
        }).catch((err) => {
            res.status(404).send("sales not found");
        });

    }).catch((err) => {
        res.status(404).send("sales not found");
    });
});







const formatDateArray = (array) => {
    for (var i = 0; i < array.length; i++) {
        datastring = array[i].datalc.toLocaleDateString('en-GB');
        array[i].datalc = datastring;
    }
    return array
}


















module.exports = router;
module.exports = router;