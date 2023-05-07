const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('app/models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => {
        done(null, user);
    }).catch(err => console.log(err));
});


passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email })
        .then((user) => {
            if (user) {
                return done(null, false, req.flash('errors', [config.lang.email_exists]));
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email,
                    password
                });
                newUser.save().then(() => {
                    return done(null, newUser);
                })
                    .catch((err) => {
                        return done(err, false, req.flash('errors', [config.lang.register_error]));
                    });
            }
        })
        .catch((err) => {
            return done(err);
        })
}));


passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email })
        .then(async (user) => {
            if (!user || ! await user.comparePasswords(password)) {
                return done(null, false, req.flash('errors', [config.lang.user_invalid]));
            }
            else {
                return done(null, user);
            }
        })
        .catch((err) => {
            return done(err, false, req.flash('errors', [config.lang.login_error]));
        })
}));