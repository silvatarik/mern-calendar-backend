const { response } = require('express');
var jwt = require('jsonwebtoken');

const validateJWS = (req, res = response, next) => {

    //x-token header
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'there isnt a token in the request'
        })
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // console.log(payload);
        req.uid = payload.uid;
        req.name= payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valid'
        })
    }

    next();
}

module.exports = { validateJWS };