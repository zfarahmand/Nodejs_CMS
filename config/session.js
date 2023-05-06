const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

module.exports = {
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    cookie: {
        expires: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRE))
    },
    saveUninitialized: true,
    client: mongoose.connection
}