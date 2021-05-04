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


const UsuarioSchema = Schema({
    nombre : {
        type : String,
        required : true
    },
    apPat : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    tarjetas : [TarjetaSchema]
});


module.exports = model('Usuario', UsuarioSchema);