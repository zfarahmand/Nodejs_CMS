const Controller = require('app/http/controllers/Controller');
const passport = require('passport');


class LoginController extends Controller {
    ShowLoginForm(req, res) {
        const title = 'صفحه ورود';
        
        res.render('home/auth/login', {
            title,
            errors: req.flash('errors'),
            displayTag: this.displayTag,
            captchaDisplayDOM: this.captchaDisplayDOM,
        });
    }

    CheckLoginProcess(req, res, next) {
        this.ValidateCaptcha(req).then(() => {
        this.ValidateData(req).then(() => {
            this.DoLogin(req, res, next);
        }).catch((error) => {
            console.log(error);
            res.redirect(req.url);
        });
        }).catch((error) => {
            console.log(error);
            res.redirect(req.url);
        });
    }

    DoLogin(req, res, next) {
        passport.authenticate('local.login', (err , user) => {
            if(user) {
                if(req.body.remember) {
                    user.setRememberToken(req , res);
                }

                req.login(user , (err) => {
                    if(!err) {
                        return res.redirect('/');
                    }
                    else {
                        return res.redirect('/auth/login')
                    }
                });
            }
            else {
                return res.redirect('/auth/login');
            }
        })(req , res , next);
    }

    DoLogout(req , res) {
        req.logOut((err) => {
            if(err) {
                return next(err);
            }
            res.clearCookie('remember_token');
            res.redirect('/');
        });
    }
}

module.exports = new LoginController();