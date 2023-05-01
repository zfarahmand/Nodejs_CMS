module.exports = class Helpers {
    constructor(req , res) {
        this.req = req;
        this.res = res;
    }

    GetObjects() {
        return {
            auth: this.Auth()
        }
    }

    Auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user
        }
    }
}