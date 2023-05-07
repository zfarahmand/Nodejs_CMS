const Controller = require('app/http/controllers/Controller');
const passport = require('passport');

class RegisterController extends Controller {

    ShowRegisterationForm(req, res) {
        const title = 'صفحه عضویت';
        
        res.render('home/auth/register', {
            title,
            errors: req.flash('errors'),
            displayTag: this.displayTag,
            captchaDisplayDOM: this.captchaDisplayDOM,
        });
    }

    CheckRegisterProcess(req, res, next) {
        this.ValidateCaptcha(req).then(() => {
            this.ValidateData(req).then(() => {
                this.DoRegister(req , res, next);
            }).catch((error) => {
                console.log(error);
                res.redirect(req.url);
            });
        }).catch((error) => {
            console.log(error);
            res.redirect(req.url);
        });
    }

    DoRegister(req , res , next) {
        passport.authenticate('local.register' , {
            successRedirect: '/',
            failureRedirect: '/auth/register',
            failureFlash: true
        })(req , res , next);
    }
    
}

module.exports = new RegisterController();