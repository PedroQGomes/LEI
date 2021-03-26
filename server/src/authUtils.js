const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (token) {
        //console.log(token);

        jwt.verify(token, process.env.JWTKEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateJWT: authenticateJWT
};