const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validarCampos = (req = request, resp = response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({
            ok : false,
            errors : errors.mapped()
        })
    }
    next();
}


const validarJWT = () => {

}


module.exports = {
    validarCampos,
    validarJWT
}