const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
var authUtils = require('../authUtils');
require('dotenv').config();





router.get('/info/', authUtils.authenticateJWT, (req, res, next) => {
    const token = req.cookies.accessToken;
    let decoded = jwt.decode(token);
    userService.getUser(decoded.id).then((results) => {

        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).send();
        }


    }).catch((err) => {
        console.log(err)
        res.status(404).send();
    });
});


module.exports = router;