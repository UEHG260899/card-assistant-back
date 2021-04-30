const { Schema, model } = require('mongoose');
const Tarjeta = require('./Tarjeta');

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
    tarjetas : [Tarjeta]
});


module.exports = model('Usuario', UsuarioSchema);