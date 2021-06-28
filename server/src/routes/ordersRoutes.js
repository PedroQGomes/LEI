const express = require('express');
const router = express.Router();
const ordersService = require('../services/ordersService');
var authUtils = require('../authUtils');
var constants = require('../constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/', authUtils.authenticateJWT, (req, res, next) => {

    console.log(req.body); // TODO MELHORAR A VERIFICAÇAO DO JSON
    if (req.body.ref === undefined || req.body.quantidade === undefined || req.body.descriçao === undefined) {
        res.status(400).send();
        return;
    }
    const token = req.cookies.accessToken;
    let decoded = jwt.decode(token);
    var data = GetFormattedDate(new Date(Date.now()));
    ordersService.insereEncomenda(decoded.id, req.body.ref, 'F1129', data, req.body.quantidade, 0, req.body.descriçao).then((results) => {

        res.status(200).json(results);

    }).catch((err) => {
        console.log(err)
        res.status(404).send();
    });
});




router.get('/user/', authUtils.authenticateJWT, (req, res, next) => {

    const token = req.cookies.accessToken;
    let decoded = jwt.decode(token);
    ordersService.getEncomendasUtilizador(decoded.id).then((results) => {

        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).send();
        }
    }).catch((err) => {
        res.status(404).send();
    });
});


function GetFormattedDate(date) {
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + (date.getDate())).slice(-2);
    var year = date.getFullYear();
    var hour = ("0" + (date.getHours())).slice(-2);
    var min = ("0" + (date.getMinutes())).slice(-2);
    var seg = ("0" + (date.getSeconds())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seg;
}




module.exports = router;