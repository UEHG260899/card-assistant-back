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
            uid : dbUsuario.id,
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


const loginUsuario = async (req = request, resp = response) => {
    const { email, password } = req.body;
    try {
        const dbUser = await Usuario.findOne( {email} );
        if(!dbUser){
            return resp.status(400).json({
                ok : false,
                msg : 'Credenciales invalidas'
            });
        }

        //Confirmar contraseña encriptada
        const validPassword = bCrypt.compareSync( password, dbUser.password );
        if(!validPassword){
            return resp.status(400).json({
                ok : false,
                msg : 'La contraseña es incorrecta'
            });
        }

        //JWT
        const token = await generarJWT(dbUser.id, email, dbUser.nombre);

        resp.status(200).json({
            ok : true,
            uid : dbUser.id,
            email,
            nombre : dbUser.nombre,
            token
        })
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al procesar su solicitud, contacte con el administrador'
        })
    }
}

const renewToken = async(req = request, resp = response) => {
    const { uid, email, nombre } = req;
    const token = await generarJWT(uid, email, nombre);
    return resp.json({
        ok : true,
        uid,
        email,
        nombre,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}