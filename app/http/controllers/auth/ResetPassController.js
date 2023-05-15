const Controller = require('app/http/controllers/Controller');
const User = require('app/models/User');
const PasswordReset = require('app/models/PasswordReset');

class ResetPassController extends Controller {
    ShowResetPassForm(req, res) {
        const title = 'تغییر رمز عبور';

        res.render('home/auth/password/reset', {
            title,
            errors: req.flash('errors'),
            displayTag: this.displayTag,
            captchaDisplayDOM: this.captchaDisplayDOM,
            token: req.params.token
        });
    }

    DoResetPass(req , res , next) {
        PasswordReset.findOne({ email: req.body.email, token: req.params.token
        }).then((result) => {
            if(!result.used) {
                User.findOneAndUpdate({email: req.body.email} , {password: req.body.password})
                .then((user) => {
                    result.used = true;
                    result.save();
                    return res.redirect('/auth/login');
                })
                .catch((err) => {
                    console.log(err);
                    req.flash('errors' , [config.lang.pass_reset_error]);
                    return this.Back(req , res);
                });
            } 
            else {
                req.flash('errors' , [config.lang.pass_reset_used]);
                return this.Back(req , res);
            }
        })
        .catch((error) => {
            req.flash('errors' , [config.lang.pass_reset_data_error]);
            return this.Back(req , res);
        });
    }
}

module.exports = new ResetPassController();