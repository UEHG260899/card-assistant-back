const { Schema, model } = require('mongoose');

const GastoSchema = Schema({
    tipo: {
        type: String,
        required : true
    },
    usuario : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tarjeta : {
        type: Schema.Types.ObjectId,
        ref: 'Tarjeta',
        required: true,
    },
    fecha : {
        type: Date,
        required: true
    },
    total : {
        type: Number,
        required: true
    }
}, { collection : 'gastos' });

GastoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model ('Gasto', GastoSchema);