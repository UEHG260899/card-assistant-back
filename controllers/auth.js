const { response, request } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');
const bCrypt = require('bcryptjs');

const crearUsuario = async (req = request, resp = response) => {
    const { nombre, apMat, email, password} = req.body;

    try {
        const usuario = await Usuario.findOne( {email} );
        if(usuario){
            return resp.status(400).json({
                ok : false,
                msg : 'Ya existe una cuenta con el email proporcionado'
            });
        }

        //Crear usuario
        const dbUsuario = new Usuario( req.body );
        const salt = bCrypt.genSaltSync();
        dbUsuario.password = bCrypt.hashSync( password, salt );

        //JWT
        const token = await generarJWT(dbUsuario.id, email, nombre);

        await dbUsuario.save();

        return resp.status(201).json({
            ok : true,
            email,
            nombre,
            token
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }
}


module.exports = {
    crearUsuario
}