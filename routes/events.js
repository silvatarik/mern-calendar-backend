// Calendar ROUTES Events ------> /api/events

const { Router, response } = require('express');
const { check, validationResult } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const {isDate} = require('../helpers/isDate');
const router = Router();

//JWS 
const { validateJWS } = require('../middlewares/jws-validate');

//Events

//With this we validate every request with JWS gLobally
router.use(validateJWS);

//Obtain all
router.get('/', getEvents);

//Create new event
router.post('/',[
    check("title", "Tittle cannot be undifined or empty").not().isEmpty(),
    check("start", "Init Date must be a date").custom(isDate),
    check("end", "End Date must be a date").custom(isDate)

],(req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: "false",
            erros: errors.mapped()
        });
    }
    next();
}, createEvent);

//Update event
router.put('/:id', [
    check("id", "ID cannot be undifined or empty").not().isEmpty()
], (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: "false",
            erros: errors.mapped()
        });
    }
    next();
}, updateEvent);

//Delete event
router.delete('/:id', [
    check("id", "ID cannot be undifined or empty").not().isEmpty()
], (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: "false",
            erros: errors.mapped()
        });
    }
    next();
}, deleteEvent);

module.exports = router;