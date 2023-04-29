const autoBind = require('auto-bind');
const arcaptcha = require('arcaptcha-nodejs');


module.exports = class Controller {
    constructor() {
        autoBind(this);
        this.displayTag = arcaptcha.display_tag();
        this.captchaDisplayDOM = arcaptcha.displayCaptcha(process.env.ARC_SITE_KEY);
        this.lang = require('lang/fa.json');
    }

    ValidateCaptcha(req) {
        return new Promise((resolve, reject) => {
            arcaptcha.verify(process.env.ARC_SECRET_KEY, process.env.ARC_SITE_KEY, req.body['arcaptcha-token'])
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