const Controller = require('app/http/controllers/Controller');

class LoginController extends Controller {
    ShowLoginForm(req , res) {
        res.render('auth/login');
    }
}

module.exports = new LoginController();