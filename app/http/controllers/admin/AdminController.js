const Controller = require('app/http/controllers/Controller');

class AdminController extends Controller {
    index(req , res) {
        res.json('Admin page');
    }

    courses(req , res) {
        res.json('Courses page');
    }
}

module.exports = new AdminController();