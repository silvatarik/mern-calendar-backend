/* Actualmente estoy hay que revisarlo porque da un error extraño
si tuvo que hacer en el mismo archivo */

const { response } = require('express');
const { validationResult } = require('express-validator');

//el next nos da un callback (por el que ademas pasamos al siguiente middleware)
const validateFields = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            ok: "false",
            erros: errors.mapped()
        });
    }

    next();

    module.exports = { validateFields };
}