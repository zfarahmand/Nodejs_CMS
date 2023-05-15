const express = require('express');
const router = express.Router();
const passport = require('passport');

// Home controllers
const loginController = require('app/http/controllers/auth/LoginController');
const registerController = require('app/http/controllers/auth/RegisterController');
const forgetPassController = require('app/http/controllers/auth/ForgetPassController');
const resetPassController = require('app/http/controllers/auth/ResetPassController');

// Auth validators
const registerValidator = require('app/http/validators/RegisterValidator');
const loginValidator = require('app/http/validators/LoginValidator');
const forgetPassValidator = require('app/http/validators/ForgetPassValidator');
const passResetValidator = require('app/http/validators/PassResetValidator');


// Auth routes

router.get('/login', loginController.ShowLoginForm);
router.post('/login', loginValidator.Handle(), (req, res, next) => loginController.CheckAuthProcess(req , res, next, loginController.DoLogin));

router.get('/register', registerController.ShowRegisterationForm);
router.post('/register', registerValidator.Handle(), (req, res , next) => registerController.CheckAuthProcess(req , res, next, registerController.DoRegister));

router.get('/password/email', forgetPassController.ShowForgetPassForm);
router.post('/password/email', forgetPassValidator.Handle(), (req , res , next) => forgetPassController.CheckAuthProcess(req , res, next, forgetPassController.SendResetLink));


router.get('/password/reset/:token' , resetPassController.ShowResetPassForm);
router.post('/password/reset/:token' , passResetValidator.Handle() , (req , res , next) => resetPassController.CheckAuthProcess(req , res, next, resetPassController.DoResetPass));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/register',
}));


module.exports = router;