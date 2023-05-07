const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('app/models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => {
        done(null, user);
    }).catch(err => console.log(err));
});


passport.use(new googleStrategy({
    clientID: config.service.google.client_id,
    clientSecret: config.service.google.client_secret,
    callbackURL: config.service.google.callback_url
} , (token , refreshToken , profile , done) => {
    
    User.findOne({ email: profile.emails[0].value }).then((user) => {
        if(user) {
            return done(null , user);
        }
        
        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id
        });

        newUser.save().then((newUser) => {
            done(null , newUser);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }).catch((err) => {
        console.log(err);
        return done(err, false, req.flash('errors', [config.lang.google_login_error]));
    })

}));


