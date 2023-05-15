const Validator = require('app/http/validators/Validator');
const { body } = require('express-validator');

class ForgetPassValidator extends Validator {
    Handle() {
        return [
            body('confirm').custom((value, {req}) => value === req.body.password)
            .withMessage(config.lang.pass_reset_confirm_error),
            body('password').isLength({ min: 8 }).withMessage(config.lang.password_short),
            body('email').notEmpty().withMessage(config.lang.email_empty)
            .isEmail().withMessage(config.lang.email_invalid)
        ]
    }
}

module.exports = new ForgetPassValidator();