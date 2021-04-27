const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//Servidor express
const app = express();

app.use( cors() );

app.use( express.json() )

app.use( '/api/auth', require('./routes/auth') );

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});