const gallery = require('../models/gallery.model');

class mediaController {
    index(req, res, next) {
        res.redirect('./images')
    }

    images(req, res, next) {
        res.render('media/images')
    }

    videos(req, res, next) {
        res.render('media/videos')
    }

    docs(req, res, next) {
        res.render('media/docs')
    }
}

module.exports = new mediaController();