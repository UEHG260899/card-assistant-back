const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');

const regExpTarjeta = '^[0-9]{4}$';
const regExpDia = '^[0-9]{1,2}$';
const regExpLimite = '^[0-9]{4,7}'
const router = Router();

//Agregar tarjeta
router.post('/new', [
    check('noTarjeta', 'El número de tarjeta es obligatorio').notEmpty(),
    check('noTarjeta', 'Solo requerimos de los últimos 4 digitos').matches(regExpTarjeta),
    check('banco', 'El campo banco es obligatorio').notEmpty(),
    check('dia_corte', 'El campo día corte es obligatorio').notEmpty(),
    check('dia_corte', 'El dia de corte solo acepta de 1 a 2 numeros').matches(regExpDia),
    check('dia_venc', 'El dia de vencimiento es obligatorio').notEmpty(),
    check('dia_venc', 'El dia de vencimiento solo acepta de 1 a 2 numeros'),
    check('limite', 'El campo limite es obligatorio').notEmpty(),
    check('limite', 'El campo limite solo acepta de 4 a 7 numeros').matches(regExpLimite),
    check('saldo', 'El campo saldo es obligatorio').notEmpty(),
    check('limite', 'El campo saldo solo acepta de 4 a 7 numeros').matches(regExpLimite),
    validarCampos
], crearTarjeta);
