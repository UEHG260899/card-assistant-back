const { request, response } = require('express');

const Gasto = require('../models/Gastos');


const getGastos = async(req = request, resp = response) => {
    resp.status(200).json({
        ok : true,
        msg : 'getGastos'
    });
}

const agregarGasto = async(req = request, resp = response) => {
    const atributos = req.body;


    try {
        const gasto = new Gasto( atributos );
        await gasto.save();
        return resp.status(200).json({
            ok : true,
            msg : 'Gasto agregado de manera exitosa'
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al ingresar el gasto'
        });
    }

}


module.exports = {
    getGastos,
    agregarGasto
}