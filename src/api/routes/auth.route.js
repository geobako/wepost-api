const express = require('express');
const {
    login,
    register,
   
   
} = require('../controllers/auth.controller');
const validationMiddleware = require('../middleware/validation.middleware');
const schemas = require('../validation/scemas');

const AuthRouter = express.Router();

AuthRouter.post('/login',validationMiddleware(schemas.authScema), login);
AuthRouter.post('/register', validationMiddleware(schemas.registerScema), register);

module.exports = AuthRouter;
