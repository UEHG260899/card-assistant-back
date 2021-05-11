const { Router } = require('express');
const { check } = require('express-validator');

const { getGastos, agregarGasto } = require('../controllers/gasto');
const { validarCampos, validarJWT } = require('../middlewares/validaciones');


const router = Router();


router.get('/', getGastos);

router.post('/', [
    validarJWT,
    check('tipo', 'El tipo de gasto es un campo obligatorio').notEmpty(),
    check('usuario', 'El usuario debe de ser un identificador válido').isMongoId(),
    check('tarjeta', 'La tarjeta debe de ser un identificador válido').isMongoId(),
    check('fecha', 'La fecha es un campo obligatorio').isDate(),
    check('total', 'El total del gasto es un campo requerido').notEmpty(),
    validarCampos
], agregarGasto);


module.exports = router;