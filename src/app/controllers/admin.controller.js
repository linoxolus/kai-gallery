const gallery = require('../models/gallery.model');
const { getValidPath } = require('../../utils/path.util');

class adminController {
    // [GET] /upload
    upload(req, res, next) {
        res.render('admin/upload');
    }

    // [GET] /list
    list(req, res, next) {
        res.render('admin/list');
    }

    // [POST] /store
    async store(req, res, next) {
        gallery
            .create({
                name: req.files[0].originalname,
                image: getValidPath(req.files[0].path),
                size: req.files[0].size,
                mimetype: req.files[0].mimetype,
                type: req.files[0].mimetype.split('/')[0],
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
