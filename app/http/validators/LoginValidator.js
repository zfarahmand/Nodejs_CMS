const Validator = require('app/http/validators/Validator');
const { body } = require('express-validator');

class LoginValidator extends Validator {
    Handle() {
        return [
            body('email').notEmpty().withMessage(config.lang.email_empty),
            body('email').isEmail().withMessage(config.lang.email_invalid),
            body('password').notEmpty().withMessage(config.lang.password_empty)
        ]
    }
}

module.exports = new LoginValidator();