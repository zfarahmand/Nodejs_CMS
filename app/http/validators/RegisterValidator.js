const Validator = require('app/http/validators/Validator');
const { body } = require('express-validator');

class RegisterValidator extends Validator {
    Handle() {
        return [
            body('name')
            .notEmpty().withMessage(config.lang.name_empty).
            isLength({ min: 6 }).withMessage(config.lang.name_short),
            body('email')
            .notEmpty().withMessage(config.lang.email_empty)
            .isEmail().withMessage(config.lang.email_invalid),
            body('password')
            .notEmpty().withMessage(config.lang.password_empty)
            .isLength({ min: 8 }).withMessage(config.lang.password_short)
        ]
    }
}

module.exports = new RegisterValidator();