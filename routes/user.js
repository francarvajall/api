const express = require('express');
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
    hasAuthorization
} = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

//define una ruta /secret/:userId que solo estará disponible para usuarios autenticados 
//(gracias al middleware requireSignin)

router.get('/secret/:userId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    });
});


router.put('/user/follow', requireSignin, addFollowing, addFollower);
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);

//Rutas que conectan los controllers de user.js y lo que se necesita para acceder a cada una ejemplo:
//router.put('/user/:userId', requireSignin, hasAuthorization, updateUser);
// para actualizar los datos de usuario prime se necesita acceder a la cuenta (signin) tener autorización (HasAuh) y acceso a update user 
router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, hasAuthorization, updateUser);
router.delete('/user/:userId', requireSignin, hasAuthorization, deleteUser);

// Para subir foto 
router.get('/user/photo/:userId', userPhoto);

// Quien te sigue (follow)
router.get('/user/findpeople/:userId', requireSignin, findPeople);

// Cualquier ruta que contenga: userId, nuestra aplicación primero ejecutará userByID()
// esto con la finalidad de validad el usuario con su token.
router.param('userId', userById);

module.exports = router;
