const express = require('express');
const router = express.Router();

// Admin router
const adminRouter = require('app/routes/web/admin');
router.use('/admin' , adminRouter);

// Home router
const homeRouter = require('app/routes/web/home');
router.use('/' , homeRouter);


module.exports = router;