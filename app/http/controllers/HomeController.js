const Controller = require('app/http/controllers/Controller');

class HomeController extends Controller {
    index(req , res) {
        res.json(req.user);
        // res.render('home');
    }

    message() {
        return 'Home page';
    }
}

module.exports = new HomeController();