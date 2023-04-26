const express = require('express');
const router = express.Router();

// Admin controllers
const adminController = require('app/http/controllers/admin/AdminController');


// Admin routes
router.get('/' , adminController.index);
router.get('/courses' , adminController.courses);

module.exports = router;