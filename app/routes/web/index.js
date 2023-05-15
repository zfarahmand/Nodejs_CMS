const express = require('express');
const router = express.Router();

const app = express();

// Auth middlewares
const RedirectIfAuthenticated = require('app/http/middleware/RedirectIfAuthenticated');

// Auth router
const authRouter = require('app/routes/web/auth');
router.use('/auth', RedirectIfAuthenticated.Handle, authRouter);

// Admin router
const adminRouter = require('app/routes/web/admin');
router.use('/admin', adminRouter);

// Home router
const homeRouter = require('app/routes/web/home');
router.use('/', homeRouter);


// TODO:  Create 404 page and config
app.use((req, res, next) => {
    res.status(404).send('404');
});

module.exports = router;