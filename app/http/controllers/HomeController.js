const Controller = require('app/http/controllers/Controller');

class HomeController extends Controller {
    index(req , res) {
        res.render('home');
    }

    message() {
        return 'Home page';
    }
}

module.exports = new HomeController();