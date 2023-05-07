module.exports = {
    arcaptcha: {
        secret_key: process.env.ARC_SECRET_KEY,
        site_key: process.env.ARC_SITE_KEY
    },
    google: {
        api_key: process.env.GOOGLE_API_KEY,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        callback_url: process.env.GOOGLE_CALLBACK_URL
    }
}