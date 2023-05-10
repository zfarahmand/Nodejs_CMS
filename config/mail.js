module.exports = {
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE,
    user: {
        from: process.env.MAILER_FROM,
        username: process.env.MAILER_USER,
        password: process.env.MAILER_PASS
    }
}