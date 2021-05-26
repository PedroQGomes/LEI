const express = require('express');
const router = express.Router();
var constants = require('../constants');
var authUtils = require('../authUtils');
const moment = require('moment');
const salesService = require('../services/salesService');


/*
router.get('/sales/:id', authUtils.authenticateJWT, (req, res, next) => {

    if (req.params.id === undefined) {
        res.status(400).send();
    }

    if (req.query.data1 === undefined) {
        res.status(400).send();
    }

    if (req.query.data2 === undefined) {
        res.status(400).send();
    }
    id = req.params.id
    var dateMomentObject = moment(req.query.data1, "DD/MM/YYYY");
    data1 = dateMomentObject.toDate();
    var dateMomentObject2 = moment(req.query.data2, "DD/MM/YYYY");
    data2 = dateMomentObject2.toDate();
    salesService.getItemSalesInDates(id, data1, data2).then((results) => {
        res.status(200).json(results);
    });

});
*/


router.get('/:ref', authUtils.authenticateJWT, (req, res, next) => {
    if (req.params.ref === undefined) {
        res.status(400).send();
    }
    itemRef = req.params.ref;


    salesService.getItemSales(itemRef).then((sales) => {
        for (var j = 0; j < sales.length; j++) {
            datastring = sales[j].datalc.toLocaleDateString('en-GB');
            ano = sales[j].datalc.getFullYear();
            mes = sales[j].datalc.getMonth();
            sales[j].ano = ano;
            sales[j].mes = mes;
            sales[j].datalc = datastring;
            sales[j].vendas = sales[j].qtt;
            delete sales[j].qtt;
        }

        salesService.getItemReturns(itemRef).then((returns) => {

            for (var i = 0; i < returns.length; i++) {
                datastring = returns[i].datalc.toLocaleDateString('en-GB');
                returns[i].datalc = datastring;
                returns[i].retornos = returns[i].qtt;
                delete returns[i].qtt;
            }
            const final = {
                "sales": sales,
                "retornos": returns
            };
            res.status(200).json(final);

        });

    }).catch((err) => {
        res.status(404).send("sales not found");
    });
});


























module.exports = router;