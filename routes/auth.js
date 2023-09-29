const express = require('express');
const { signup, 
        signin, 
        signout, 
        //forgotPassword, 
        //resetPassword, 
        //socialLogin 
    } = require('../controllers/auth');

// import password reset validator
const { userSignupValidator, userSigninValidator, passwordResetValidator } = require('../validator');
const { userById } = require('../controllers/user');

const router = express.Router();

//Rutas que acceden a controllers de auth.js usuario
router.post('/signup', userSignupValidator, signup);
router.post('/signin', userSigninValidator, signin);
router.get('/signout', signout);

// contraseña olvidada y restablecer rutas (Aún no definido)
//router.put('/forgot-password', forgotPassword);
//router.put('/reset-password', passwordResetValidator, resetPassword);

// luego use esta ruta para iniciar sesión social (google Aún no definido)
//router.post('/social-login', socialLogin);

// Cualquier ruta que contenga: userId, nuestra aplicación primero ejecutará userByID()
router.param('userId', userById);

module.exports = router;
