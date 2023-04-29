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
            body('name').notEmpty().withMessage('فیلد نام کاربری نمیتواند خالی باشد'),
            body('name').isLength({ min: 6 }).withMessage('فیلد نام کاربری نمیتواند کمتر از 6 کارکتر باشد'),
            body('email').notEmpty().withMessage('فیلد ایمیل  نمیتواند خالی باشد'),
            body('email').isEmail().withMessage(' ایمیل وارد شده اشتباه است '),
            body('password').notEmpty().withMessage('فیلد کلمه عبور نمیتواند خالی باشد'),
            body('password').isLength({ min: 8 }).withMessage('کلمه عبور نباید کمتر از 8 کاراکتر باشد')
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