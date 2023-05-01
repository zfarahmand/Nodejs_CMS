const Middleware = require('app/http/middleware/Middleware');
const User = require('app/models/User');

class RedirectIfAuthenticated extends Middleware{
    Handle(req , res , next) {
        if(req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    }
}

module.exports = new RedirectIfAuthenticated();