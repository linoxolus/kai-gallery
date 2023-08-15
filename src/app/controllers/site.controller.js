class siteController {
    // [GET] /
    index(req, res, next) {
        res.render('home');
    }
}

module.exports = new siteController();