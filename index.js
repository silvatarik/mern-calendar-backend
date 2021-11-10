const express = require('express');

var cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Conexión  a la base de datos
dbConnection();

//CORS
app.use(cors());

//Rutas públicas -- Destacar que el app.use es un middleware
app.use(express.static('public'));

//Ruta del parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});