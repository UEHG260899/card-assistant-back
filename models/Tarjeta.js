const { Schema, model } = require('mongoose');

const TarjetaSchema = Schema({
    noTarjeta : {
        type : Number,
        required : true
    },
    banco : {
        type : String,
        required : true
    },
    dia_corte : {
        type : Number,
        required : true 
    },
    dia_venc : {
        type : Number,
        required : true
    },
    limite : {
        type : Number,
        required : true
    },
    saldo : {
        type : Number,
        required : true
    }
});

module.exports = {
    TarjetaSchema
};