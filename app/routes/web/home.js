const express = require('express');
const router = express.Router();

// Home controllers
const homeController = require('app/http/controllers/HomeController');
const loginController = require('app/http/controllers/auth/LoginController');
const registerController = require('app/http/controllers/auth/RegisterController');
const { body, validationResult } = require('express-validator');
const RedirectIfAuthenticated = require('app/http/middleware/RedirectIfAuthenticated');


// Home routes

router.get('/', homeController.index);
router.get('/login', RedirectIfAuthenticated.Handle , loginController.ShowLoginForm);
router.post('/login' , [RedirectIfAuthenticated.Handle , loginController.UserLoginRules(body)] , (req , res , next) => {
    loginController.LoginProcess(req , res , next , validationResult);
});
router.get('/register', RedirectIfAuthenticated.Handle , registerController.ShowRegisterationForm);
router.post('/register', [RedirectIfAuthenticated.Handle , registerController.UserRegisterationRules(body)] , (req , res , next) => {
    registerController.RegisterProcess(req , res , next , validationResult);
});

router.get('/logout' , (req , res , next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        res.clearCookie('remember_token');
        res.redirect('/');
    });
});


module.exports = router;