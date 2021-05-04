const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Servidor express
const app = express();
dbConnection();

app.use( cors() );

app.use( express.json() )

app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/tarjeta', require('./routes/tarjeta') );

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});