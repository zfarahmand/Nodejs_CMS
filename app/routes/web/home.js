const express = require('express');
const router = express.Router();

// Home controllers
const homeController = require('app/http/controllers/HomeController');
const loginController = require('app/http/controllers/auth/LoginController');
const registerController = require('app/http/controllers/auth/RegisterController');

// Home routes
router.get('/' , homeController.index);
router.get('/login' , loginController.ShowLoginForm);
router.get('/register' , registerController.ShowRegisterationForm);

module.exports = router;