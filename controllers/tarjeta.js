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
        return resp.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al momento de crear la tarjeta'
        });
    }

}

const getInfoTarjeta = async(req = request, resp = response) => {
    const idTarjeta = req.params.id;

    try{
        const dbUser = await Usuario.findOne({
            'tarjetas._id' : idTarjeta
        }).select('tarjetas');


        if(!dbUser){
            return resp.status(404).json({
                ok : false,
                msg : 'No tenemos registro de la tarjeta indicada'
            });
        }

        const tarjeta = dbUser.tarjetas.find(obj => obj.id === idTarjeta);
        resp.status(200).json({
            ok : true,
            tarjeta
        });
    }catch(err){
        console.log(err);
        resp.status(500).json({
            ok : false,
            msg : 'Ocurrió un error al momento de obtener la tarjeta'
        });
    }
}


const getTarjetas = async(req = request, resp = response) => {
    const { uid } = req.body;
    try{
        const dbUser = await Usuario.findById(uid);
        return resp.status(200).json({
            ok : true,
            tarjetas : dbUser.tarjetas
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al momento de obtener sus tarjetas'
        });
    }
}

const eliminaTarjeta = async(req = request, resp = response) => {
    const uid = req.params.id;
    try{
        const dbUser = await Usuario.findOne({
            'tarjetas._id' : uid
        }).select('tarjetas');

        if(!dbUser){
            return resp.status(404).json({
                ok : false,
                msg : 'No se encontro la tarjeta solicitada'
            });
        }

        const tarjeta = dbUser.tarjetas.find(obj => obj.id === uid);
        const indice = dbUser.tarjetas.indexOf(tarjeta);
        dbUser.tarjetas.splice(indice, 1);
        
        await dbUser.save();

        return resp.status(200).json({
            ok : true,
            msg : 'Tarjeta eliminada exitosamente'
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al momento de eliminar la tarjeta'
        });
    }
}

module.exports = {
    crearTarjeta,
    getTarjetas,
    getInfoTarjeta,
    eliminaTarjeta
}