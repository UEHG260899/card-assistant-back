const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validarCampos = (req = request, resp = response, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({
            ok : false,
            errors : errors.mapped()
        });
    }
    next()
}


const validarJWT = (req = request, resp = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return resp.status(401).json({
            ok : false,
            msg : 'No existe un token de autenticación'
        });
    }

    try {
        const { uid, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.email = email;
    }catch(err){
        return resp.status(401).json({
            ok : false,
            msg : 'Ocurrio un error al validar su token'
        });
    }
}


module.exports = {
    validarCampos,
    validarJWT
}