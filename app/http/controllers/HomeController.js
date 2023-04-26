const Controller = require('app/http/controllers/Controller');

class HomeController extends Controller {
    index(req , res) {
        res.json(this.message());
    }

    message() {
        return 'Home page';
    }
}

module.exports = new HomeController();