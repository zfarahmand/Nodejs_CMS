const Controller = require('app/http/controllers/Controller');

class RegisterController extends Controller {
    ShowRegisterationForm(req , res) {
        res.render('auth/register');
    }
}

module.exports = new RegisterController();