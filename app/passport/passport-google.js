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


