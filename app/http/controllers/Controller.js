const autoBind = require('auto-bind');
const { validationResult } = require('express-validator');
const arcaptcha = require('arcaptcha-nodejs');
const NodeMailer = require('app/mail/NodeMailer');
const GetHTMLTemplate = require('app/mail/Template');

let errorMessages = [];


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

    ValidateData(req) {
        let promise = new Promise((resolve, reject) => {
            const result = validationResult(req);
            if (result) {
                if (result.isEmpty()) {
                    resolve(result);
                }
                else {
                    errorMessages = [];
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

    SendEmail(email, subject, text) {
        const nodemailer = new NodeMailer(false);
        const options = {
            from: config.mail.user.from,
            to: email,
            subject,
            text,
            html: GetHTMLTemplate(text , subject),
        }

        nodemailer.SendMail(options, (info) => {
            console.log("Email sent successfully");
        });
    }

    CheckAuthProcess(req, res, next, callback) {
        this.ValidateCaptcha(req).then(() => {
            this.ValidateData(req).then(() => {
                callback(req, res, next);
            }).catch((error) => {
                console.log(error);
                res.redirect(req.originalUrl);
            });
        }).catch((error) => {
            console.log(error);
            res.redirect(req.originalUrl);
        });
    }

    Back(req, res) {
        return res.redirect(req.header('Referer') || '/');
    }
}