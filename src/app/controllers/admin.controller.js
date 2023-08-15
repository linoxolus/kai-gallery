class adminController {
    // [GET] /upload
    upload(req, res, next) {
        res.render('upload');
    }

    // [GET] /list
    list(req, res, next) {
        res.render('list');
    }
}

module.exports = new adminController();