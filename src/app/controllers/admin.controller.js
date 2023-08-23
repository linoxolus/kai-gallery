const gallery = require('../models/gallery.model');

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
        gallery
            .create({
                name: req.files[0].originalname,
                image: req.files[0].path,
                size: req.files[0].size,
                mime: req.files[0].mimetype,
            })
            .then(() => {
                res.status(201).json({
                    message: 'success',
                });
            })
            .catch(next);
    }
}

module.exports = new adminController();
