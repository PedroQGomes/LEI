const express = require('express');
const router = express.Router();
var constants = require('../constants');
var authUtils = require('../authUtils');
const moment = require('moment');
const salesService = require('../services/salesService');



router.get('/season/', authUtils.authenticateJWT, (req, res, next) => {

    if (req.query.epoca === undefined) {
        res.status(400).send();
    }

    if (req.query.year === undefined) {
        res.status(400).send();
    }
    id = req.params.id
    var dateMomentObject = moment(req.query.data1, "DD/MM/YYYY");
    data1 = dateMomentObject.toDate();
    var dateMomentObject2 = moment(req.query.data2, "DD/MM/YYYY");
    data2 = dateMomentObject2.toDate();
    salesService.getItemSalesQttInDates(id, data1, data2).then((results) => {
        res.status(200).json(results);
    });

});



router.get('/:ref', authUtils.authenticateJWT, (req, res, next) => {
    if (req.params.ref === undefined) {
        res.status(400).send();
    }
    itemRef = req.params.ref;


    salesService.getItemSalesQtt(itemRef).then((sales) => {
        for (var j = 0; j < sales.length; j++) {
            datastring = sales[j].datalc.toLocaleDateString('en-GB');
            sales[j].datalc = datastring;
            sales[j].vendas = sales[j].qtt;
            delete sales[j].qtt;
        }

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
        array[i].retornos = array[i].qtt;
        delete array[i].qtt;
    }
    return array
}


















module.exports = router;