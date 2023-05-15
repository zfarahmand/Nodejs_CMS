const Validator = require('app/http/validators/Validator');
const { body } = require('express-validator');

class ForgetPassValidator extends Validator {
    Handle() {
        return [
            body('email').notEmpty().withMessage(config.lang.email_empty),
            body('email').isEmail().withMessage(config.lang.email_invalid),
        ]
    }
}

module.exports = new ForgetPassValidator();