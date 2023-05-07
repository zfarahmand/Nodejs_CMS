const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('app/helpers');
const RememberToken = require('app/http/middleware/RememberLogin');

const app = express();

module.exports = class Aplication {
    constructor() {
        this.SetupExpress();
        this.SetConfig();
        this.SetRouters();
    } 

    SetupExpress() {
        const server = http.createServer(app);
        server.listen(config.port, () => console.log(`Server is listening on port ${config.port}.`));
    }

    SetMongoConnection() {
        mongoose.connect(config.database.url);
    }

    SetConfig() {
        this.SetMongoConnection();
        require('app/passport/passport-local');
        require('app/passport/passport-google');

        app.use(config.layout.ejs.expressLayouts);
        app.set('layout extractScripts' , config.layout.ejs.extractScripts);
        app.set('layout extractStyles' , config.layout.ejs.extractStyles);
        app.set('layout' , config.layout.ejs.layoutPage);
        app.use(express.static(config.layout.public_dir));
        app.set('view engine', config.layout.view_engine);
        app.set('views', config.layout.views_dir);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(session({...config.session}));
        app.use(cookieParser(config.cookie_secret_key));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(RememberToken.Handle);
        app.use((req , res , next) => {
            app.locals = new Helpers(req , res).GetObjects();
            next();
        });
    }

    SetRouters() {
        app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
}