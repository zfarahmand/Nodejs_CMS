const express = require('express');
const router = express.Router();

// Home controllers
const homeController = require('app/http/controllers/HomeController');
const loginController = require('app/http/controllers/auth/LoginController');


// Home middlewares

// Home validators

// Home routes

router.get('/', homeController.index);

router.get('/logout' , (req , res , next) => {
    loginController.DoLogout(req , res);
});


module.exports = router;