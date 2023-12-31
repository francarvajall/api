//ausencia de  passwordResetValidator (Ultimo)

//Validadores de respuesta a las acciones de la pagina principal Fronted 
exports.createPostValidator = (req, res, next) => {
    // titulo de post 
    req.check('title', 'Write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });
    // body (cuerpo o contenido de post)
    req.check('body', 'Write a body').notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });
    // comprobar si hay errores
    const errors = req.validationErrors();
    // Si hay error, muestra el primero
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // procede al siguiente middleware, luz verde se activan los controllers de post.js
    next();
};


exports.userSignupValidator = (req, res, next) => {
    // Si el nombre no es nulo y tiene entre 4 y 10 caracteres
    req.check('name', 'Name is required').notEmpty();
    // El correo electrónico no es nulo, válido y normalizado
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });
    // validadores para crear contraseña
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // comprobar si hay errores
    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    //procede al siguiente middleware, luz verde se activan los controllers de user.js
    next();
};

exports.userSigninValidator = (request, response, next) => {
    request
        .check('email', 'Email must be between 3 to 32 characters')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('Please type your valid email address')
        .isLength({
            min: 4,
            max: 32
        });
    request.check('password', 'Invalid Social Login Token!').notEmpty();
    request
        .check('password')
        .isLength({ min: 6 })
        .withMessage('Your social login token is invalid!');
    const errors = request.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    //procede al siguiente middleware, luz verde se activan los controllers de user.js
    next();
};

