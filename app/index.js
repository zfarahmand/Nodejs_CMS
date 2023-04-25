require('dotenv').config();
const express      = require('express');
const http         = require('http');
const bodyParser   = require('body-parser');
const path         = require('path');
const cookieParser = require('cookie-parser');
const validator    = require('express-validator');
const session      = require('express-session');
const MongoStore   = require('connect-mongo');
const mongoose     = require('mongoose');
const flash        = require('connect-flash');
const passport     = require('passport');

const app = express();

module.exports = class Aplication {
    constructor() {
        this.SetupExpress();
        this.SetConfig();

        app.get('/' , (req , res) => {
            res.json('hello world!');
        });
    }

    SetupExpress() {
        const server = http.createServer(app);
        server.listen(3000 , () => console.log('Server is listening on port 3000.'));
    }

    SetConfig() {
        app.use(express.static('public'));
        app.set('view engine' , 'ejs');
        app.set('views' , path.resolve('./resource/views'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(session({
            secret: process.env.SECRET_KEY,
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/test-app' })
        }));
        app.use(cookieParser(process.env.SECRET_KEY));
    }
}