const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Base de Datos MongoDB 
// Para activar el servidor mongo db se implementa file .env en este se encuentra las dependencias 
// de la base de datos personal con cuenta
// MONGO_URI=mongodb://localhost/

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// Llmamos las rutas de la carpeta "routes" para que el servidor ejecute la ruta solicitada.
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// middleware
// esta proporciona servicios y funciones esenciales para facilitar la comunicación 
// y la interoperabilidad entre diferentes componentes 
// por ejemplo app.use('/', userRoutes); activa los componentes de controllers (user.js)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

//Se hace comunicación con un puerto para escuhar y activar los componentes (api)
//El servidor se activa desde el cmd comando > npm run dev

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});
