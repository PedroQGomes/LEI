const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();



router.post('/login/', (req, res, next) => {
    let username = req.body.username;
    let passw = req.body.password;


    if (username === undefined || passw === undefined) {
        res.status(400).send();
    }


    userService.getUser(username, passw).then((results) => {
        user = results[0];
        if (user) {

            const accessToken = jwt.sign({ id: user.userno, adm: user.ESA }, process.env.JWTKEY, {
                expiresIn: '30m'
            });

            res.cookie('accessToken', accessToken, { httpOnly: true });

            res.status(200).json({
                token: accessToken
            })


        } else {
            res.status(404).send();
        }

    });


});


module.exports = router;