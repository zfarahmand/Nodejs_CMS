const express = require('express');
const router = express.Router();

// Home controllers
const homeController = require('app/http/controllers/HomeController');
const loginController = require('app/http/controllers/auth/LoginController');
const registerController = require('app/http/controllers/auth/RegisterController');

// Home middlewares
const RedirectIfAuthenticated = require('app/http/middleware/RedirectIfAuthenticated');

// Home validators
const registerValidator = require('app/http/validators/RegisterValidator');
const loginValidator = require('app/http/validators/LoginValidator');


// Home routes

router.get('/', homeController.index);

router.get('/login', RedirectIfAuthenticated.Handle , loginController.ShowLoginForm);
router.post('/login' , [RedirectIfAuthenticated.Handle , loginValidator.Handle()] , (req , res , next) => 
    loginController.CheckLoginProcess(req , res , next));

router.get('/register', RedirectIfAuthenticated.Handle , registerController.ShowRegisterationForm);
router.post('/register', [RedirectIfAuthenticated.Handle , registerValidator.Handle()] , (req , res , next) =>
    registerController.CheckRegisterProcess(req , res , next));

router.get('/logout' , (req , res , next) => {
    loginController.DoLogout(req , res);
});


module.exports = router;