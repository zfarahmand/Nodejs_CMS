const Middleware = require('app/http/middleware/Middleware');
const User = require('app/models/User');

class RememberToken extends Middleware {
    Handle(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            if (rememberToken) {
                return this.FindUser(req , rememberToken , next);
            }
        }
        next();
    }

    FindUser(req , rememberToken , next) {
        User.findOne({ rememberToken }).then((user) => {
            if (user) {
                req.login(user, (err, user) => {
                    if (err) {
                        next(err);
                    }
                    next();
                });
            }
            next();
        }).catch((err) => {
            next(err);
        });
    }
}


module.exports = new RememberToken();