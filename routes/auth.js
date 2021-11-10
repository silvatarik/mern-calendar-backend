// USER ROUTES  ------> /api/auth

const { Router, response } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

//JWS 
const {validateJWS} = require('../middlewares/jws-validate');

const router = Router();

router.post("/new", [
    check("name", "Name cannot be undifined").not().isEmpty(),
    check("email", "Emaill has to be with a format email").isEmail(),
    check("password", "Password must to be atleast 6 digits").isLength({ min: 6 }),
], (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: "false",
            erros: errors.mapped()
        });
    }
    next();
}, createUser);

router.post("/", [
    check("email", "Emaill has to be with a format email").isEmail(),
    check("password", "Password must to be atleast 6 digits").isLength({ min: 6 }),

], (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: "false",
            erros: errors.mapped()
        });
    }
    next();
}, loginUser);

router.get("/renew", validateJWS ,revalidateToken);

//exportacion por defecto
module.exports = router;