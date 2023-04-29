const autoBind = require('auto-bind');
const arcaptcha = require('arcaptcha-nodejs');


module.exports = class Controller {
    constructor() {
        autoBind(this);
        this.displayTag = arcaptcha.display_tag();
        this.captchaDisplayDOM = arcaptcha.displayCaptcha(process.env.ARC_SITE_KEY);
    }

    ValidateCaptcha(req) {
        return new Promise((resolve, reject) => {
            arcaptcha.verify(process.env.ARC_SECRET_KEY, process.env.ARC_SITE_KEY, req.body['arcaptcha-token'])
            .then((data) => {
                if (data === true || data.success) {
                    resolve(true);
                }
                else {
                    const error = 'پاسخ کپچا نامعتبر است.';
                    req.flash('errors', [error]);
                    reject(error);
                }
            });
        });
    }
}