const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares/validaciones');


const regExpPass = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$";
const regExpNom = "^(a-zA-Z){6}$";


const router = Router();

//Registro
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', "El nombre no tiene el formato requierido").matches(regExpNom),
    check('apPat', "El apellido paterno es obligatorio").notEmpty(),
    check('apPat', "El apellido paterno no cumple con el formato").matches(regExpNom),
    check('apMat', "El apellido materno es obligatorio").notEmpty(),
    check('apMat', "El apellido materno no cumple con el formato").matches(regExpNom),
    check('email', "El email es un campo obligatorio").notEmpty().isEmail(),
    check('password', "La contraseña es un campo requierido").notEmpty().matches(regExpPass),
    validarCampos
]);


//Login
router.post('/' , [
    check('email', 'El nombre de usuario es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
]);

//Renovar token

router.get('/renew', validarJWT);



module.exports = router;