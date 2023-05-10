const nodemailer = require('nodemailer');

module.exports = class Nodemailer {
    constructor(withTestAccount) {
        const user = null;
        const pass = null;
        const transporter = null;

        if(withTestAccount) {
            const testAccount = this.CreateTestAccount();
            this.user = testAccount.user;
            this.pass = testAccount.pass;
        }
        else {
            this.user = config.mail.user.username;
            this.pass = config.mail.user.password;
        }
        this.transporter = this.CreateTransporter();
    }

    async CreateTestAccount() {
        try {
            return await nodemailer.createTestAccount();
        } catch(error) {
            console.log(error);
        }
    }

    CreateTransporter() {
        return nodemailer.createTransport({
            service: config.mail.service,
            host: config.mail.host,
            port: config.mail.port,
            secure: config.mail.secure,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
    }

    async SendMail(credentials , callback) {
        try {
            const info = await this.transporter.sendMail(credentials);
            callback(info);
        } catch(error) {
            console.log(error);
        }

    }
}