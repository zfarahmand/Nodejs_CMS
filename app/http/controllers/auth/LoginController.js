const Controller = require('app/http/controllers/Controller');
const passport = require('passport');

let errorMessages = [];


class LoginController extends Controller {
    ShowLoginForm(req, res) {
        res.render('auth/login', {
            errors: req.flash('errors'),
            displayTag: this.displayTag,
            captchaDisplayDOM: this.captchaDisplayDOM,
        });
    }

    LoginProcess(req, res, next, validationResult) {
        this.ValidateCaptcha(req).then(() => {
        this.ValidateLogin(req, validationResult).then(() => {
            this.Login(req, res, next);
        }).catch((errors) => {
            res.redirect(req.url);
        });
        }).catch((error) => {
            res.redirect(req.url);
        });
    }

    Login(req, res, next) {
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
                        return res.redirect('/login')
                    }
                });
            }
            else {
                return res.redirect('/login');
            }
        })(req , res , next);
    }

    UserLoginRules(body) {
        return [
            body('email').notEmpty().withMessage(this.lang.email_empty),
            body('email').isEmail().withMessage(this.lang.email_invalid),
            body('password').notEmpty().withMessage(this.lang.password_empty)
        ]
    }

    ValidateLogin(req, validationResult) {
        let promise = new Promise((resolve, reject) => {
            const result = validationResult(req);
            if (result) {
                if (result.isEmpty()) {
                    resolve(result);
                }
                else {
                    result.errors.forEach(error => errorMessages.push(error.msg));

                    req.flash('errors', errorMessages);
                    reject(errorMessages);
                }
            }
            else {
                reject(['Something went wrong!']);
            }
        });
        return promise;
    }
}

module.exports = new LoginController();