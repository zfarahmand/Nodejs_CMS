const Controller = require('app/http/controllers/Controller');
const PasswordReset = require('app/models/PasswordReset');
const User = require('app/models/User');
const uniqueString = require('unique-string');

class ForgetPassController extends Controller {
    ShowForgetPassForm(req, res) {
        const title = 'فراموشی رمز عبور';

        res.render('home/auth/password/email', {
            title,
            errors: req.flash('errors'),
            displayTag: this.displayTag,
            captchaDisplayDOM: this.captchaDisplayDOM,
        });
    }

    SendResetLink(req, res, next) {
        const email = req.body.email;

        User.findOne({ email: email }).then((user) => {
            if (!user) {
                req.flash('errors', [config.lang.email_not_exists]);
                console.log(res);
                return this.Back(req, res);
            }

            const token = uniqueString();
            const newPassReset = new PasswordReset({
                email: email,
                token: token,
            });

            newPassReset.save().then(() => {
                const message = `<a href='${config.protocol}://${req.headers.host}/auth/password/reset/${token}'>${config.protocol}://${req.headers.host}/password/reset/${token}</a>`;
                this.SendEmail(email , config.lang.pass_reset_email_subject , message);

                // req.flash('success' , [config.lang.pass_reset_success]);
                res.redirect('/');
            })
            .catch((err) => {
                    req.flash('errors', [config.lang.pass_reset_error]);
                    return this.Back(req, res);
            });
        });
    }
}

module.exports = new ForgetPassController();