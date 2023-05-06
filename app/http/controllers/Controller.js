const autoBind = require('auto-bind');
const arcaptcha = require('arcaptcha-nodejs');


module.exports = class Controller {
    constructor() {
        autoBind(this);
        this.displayTag = arcaptcha.display_tag();
        this.captchaDisplayDOM = arcaptcha.displayCaptcha(config.service.arcaptcha.site_key);
        this.lang = config.lang;
    }

    ValidateCaptcha(req) {
        return new Promise((resolve, reject) => {
            arcaptcha.verify(config.service.arcaptcha.secret_key, config.service.arcaptcha.site_key, req.body['arcaptcha-token'])
            .then((data) => {
                if (data === true || data.success) {
                    resolve(true);
                }
                else {
                    const error = this.lang.captcha_invalid;
                    req.flash('errors', [error]);
                    reject(error);
                }
            });
        });
    }
}