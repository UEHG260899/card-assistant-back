const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.BD_CDN, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        } );

        console.log('Base de Datos arriba');
    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de iniciar la Base de Datos');
    }
}

module.exports = {
    dbConnection
}