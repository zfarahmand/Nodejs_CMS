const express = require('express');
const router = express.Router();

// Home controllers
const homeController = require('app/http/controllers/HomeController');
const loginController = require('app/http/controllers/auth/LoginController');
const registerController = require('app/http/controllers/auth/RegisterController');
const { body, validationResult } = require('express-validator');


// Home routes

router.get('/', homeController.index);
router.get('/login', loginController.ShowLoginForm);
router.get('/register', registerController.ShowRegisterationForm);
router.post('/register', registerController.UserRegisterationRules(body) , (req , res , next) => {
    registerController.RegisterProcess(req , res , next , validationResult);
});


module.exports = router;