const express = require('express');
const router = express.Router();

// Home controllers
const homeController = require('app/http/controllers/HomeController');

// Home routes
router.get('/' , homeController.index);

module.exports = router;