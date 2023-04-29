const Controller = require('app/http/controllers/Controller');

let errorMessages = [];


class RegisterController extends Controller {

    ShowRegisterationForm(req, res) {
        res.render('auth/register', {
            errors: req.flash('errors'),
            displayTag: this.displayTag,
            captchaDisplayDOM: this.captchaDisplayDOM,
        });
    }

    RegisterProcess(req, res, next, validationResult) {
        this.ValidateCaptcha(req).then(() => {
            this.ValidateRegisteration(req, validationResult).then(() => {
                res.redirect('/login');
                // registeration logic
            }).catch((errors) => {
                res.redirect(req.url);
            });
        }).catch((error) => {
            res.redirect(req.url);
        });
    }

    UserRegisterationRules(body) {
        return [
            body('name').notEmpty().withMessage(this.lang.name_empty),
            body('name').isLength({ min: 6 }).withMessage(this.lang.name_short),
            body('email').notEmpty().withMessage(this.lang.email_empty),
            body('email').isEmail().withMessage(this.lang.email_invalid),
            body('password').notEmpty().withMessage(this.lang.password_empty),
            body('password').isLength({ min: 8 }).withMessage(this.lang.password_short)
        ]
    }


    ValidateRegisteration(req, validationResult) {
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

module.exports = new RegisterController();