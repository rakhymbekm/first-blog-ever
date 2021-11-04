const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {

        const token = req.header('token');

        if (!token) {
            // 403 - unauthorized
            return res.status(403).json("Not Authorized");
        }

        const payload = jwt.verify(token, process.env.jwtSecret);

        req.user = payload.user
    } catch (err) {
        console.error(err);
        // 403 - unauthorized
        return res.status(403).json("Not Authorized");
    }

    next();
};