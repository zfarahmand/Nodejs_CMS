const database = require('config/database');
const session = require('config/session');
const layout = require('config/layout');
const service = require('config/service');

module.exports = {
    database,
    session,
    layout,
    service,
    lang: require('lang/' + process.env.APP_LANG + '.json') ?? require('lang/fa.json'),
    port: process.env.APP_PORT,
    cookie_secret_key: process.env.COOKIE_SECRET_KEY
}