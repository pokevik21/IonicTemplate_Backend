const path = require('path');
const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config')

// Crear el servidor express
const app = express();

// Configurando CORS
app.use(cors());

// Lectura y parseo de body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./Routes/usuarios'));
app.use('/api/login', require('./Routes/auth'));
app.use('/api/hospitales', require('./Routes/hospitales'));
app.use('/api/medicos', require('./Routes/medicos'));
app.use('/api/todo', require('./Routes/buscador'));
app.use('/api/upload', require('./Routes/uploads'));

//Lo último
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ));
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});