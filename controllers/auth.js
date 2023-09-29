/*
Controladores y middlewares que se encargan de la autenticación de usuarios en la aplicación web, 
permitiendo a los usuarios registrarse, iniciar sesión, cerrar sesión y proteger rutas que 
requieren autenticación utilizando tokens JWT. 
*/

const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/user');
const _ = require('lodash');


//ME FALTA INGRESAR forgotPassword , resetPassword , socialLogin

//Para crear una nueva cuenta 
exports.signup = (req, res) => {
    //  console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    // Encuentra a la usuario basada en el correo electrónico.
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // Si se encuentra el usuario, se asegura de que el correo electrónico y la contraseña coincidan.
        // cree un método de autenticación en el modelo 
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }
        // generar un token con identificación de usuario y secreto
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        // persistir el token como 't' en la cookie con fecha de caducidad
        res.cookie('t', token, { expire: new Date() + 9999 });
        // devolver respuesta con usuario y token al cliente frontend
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

//Para salir de cuenta usuario
exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success!' });
};

// se exporta jwt secret
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});