const express = require('express');
const router = express.Router();

// Home controllers
const loginController = require('app/http/controllers/auth/LoginController');
const registerController = require('app/http/controllers/auth/RegisterController');

// Auth validators
const registerValidator = require('app/http/validators/RegisterValidator');
const loginValidator = require('app/http/validators/LoginValidator');


// Auth routes

router.get('/login', loginController.ShowLoginForm);
router.post('/login' , loginValidator.Handle() , (req , res , next) => 
    loginController.CheckLoginProcess(req , res , next));

router.get('/register', registerController.ShowRegisterationForm);
router.post('/register', registerValidator.Handle() , (req , res , next) =>
    registerController.CheckRegisterProcess(req , res , next));


module.exports = router;