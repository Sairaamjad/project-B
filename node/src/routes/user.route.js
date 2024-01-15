// user.route.js

const express = require('express');
const userRouter = express.Router();
const { validateUserRegistration, validateUserSignIn } = require('../middleware/joi.js');
const { signUp, signIn, getAll, getOne, userDel, userUpdate } = require('../controllers/user.controller.js');

// Public routes (signup and login)
userRouter.post('/create', validateUserRegistration, signUp);
userRouter.post('/login', validateUserSignIn, signIn);
userRouter.get('/',getAll);
userRouter.get('/:id', getOne);
userRouter.delete('/:id', userDel);
userRouter.put('/:id', userUpdate);

  

module.exports = userRouter;
