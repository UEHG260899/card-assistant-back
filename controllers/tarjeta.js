const { request, response } = require('express');
const Usuario = require('../models/Usuario');


const crearTarjeta = async (req = request, resp = response) => {
    const { noTarjeta, banco, dia_corte, dia_venc, limite, saldo, uid } = req.body;

    try {
        const dbUser = await Usuario.findById(uid);
        if(!dbUser){
            return resp.status(404).json({
                ok : false,
                msg : 'No se ha encontrado al usuario'
            });
        }

        if(dbUser.tarjetas.length === 0){
            dbUser.tarjetas = [{
                noTarjeta,
                banco,
                dia_corte,
                dia_venc,
                limite,
                saldo
            }]
        }else{
            dbUser.tarjetas.push({
                noTarjeta,
                banco,
                dia_corte,
                dia_venc,
                limite,
                saldo
            });
        }

        await dbUser.save();

        return resp.status(200).json({
            ok : true,
            msg : 'Tarjeta agregada!'
        });
    } catch (err) {
        console.log(err);
        return resp.status(401).json({
            ok: false,
            msg: 'Ocurrió un error al momento de crear la tarjeta'
        });
    }

}


module.exports = {
    crearTarjeta
}