const files = require('../models/gallery.model');

class adminController {
    // [GET] /upload
    upload(req, res, next) {
        res.render('upload');
    }

    // [GET] /list
    list(req, res, next) {
        res.render('list');
    }

    // [POST] /store
    async store(req, res, next) {


        res.status(201).json({
            message: "success"
        })
    }
}

module.exports = new adminController();