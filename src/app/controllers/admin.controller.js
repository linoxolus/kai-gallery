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
        files.create({
            name: req.files[0].originalname,
            image: req.files[0].path,
            size: req.files[0].size,
            mime: req.files[0].mimetype,
        })
        .then(() => {res.status(201)})
        .catch(next);

        res.status(201).json({
            message: "success"
        })
    }
}

module.exports = new adminController();