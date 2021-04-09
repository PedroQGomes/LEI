const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
var authUtils = require('../authUtils');
require('dotenv').config();


router.post('/login/', (req, res, next) => {
    let username = req.body.username;
    let passw = req.body.password;


    if (username === undefined || passw === undefined) {
        res.status(400).send();
    }


    userService.loginUser(username, passw).then((results) => {
        user = results;
        if (user) {

            const accessToken = jwt.sign({ id: user.userno, adm: user.ESA }, process.env.JWTKEY, {
                expiresIn: '30m'
            });

            res.cookie('accessToken', accessToken, { httpOnly: true });

            res.status(200).json(user);


        } else {
            res.status(404).send();
        }

    });


});


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
        res.status(404).send();
    });
});


module.exports = router;