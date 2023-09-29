const express = require('express');
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment,
    updateComment
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

// Rutas que acceden a controllers de Post.js reacción
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// Rutas que acceden a controllers de Post.js Comentarios
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);
router.put('/post/updatecomment', requireSignin, updateComment);

// Rutas que acceden a controllers de Post.js Post
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

// Para cargar foto a post
router.get('/post/photo/:postId', photo);

// // Cualquier ruta que contenga: userId, nuestra aplicación primero ejecutará userByID()
router.param('userId', userById);
// cualquier ruta que contenga: postId, nuestra aplicación primero ejecutará postById()
router.param('postId', postById);

module.exports = router;
