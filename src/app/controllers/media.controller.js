const gallery = require('../models/gallery.model');
const { mongoosesToObject } = require('../../utils/mongoose.util');

class mediaController {
    index(req, res, next) {
        res.redirect('./images');
    }

    images(req, res, next) {
        gallery
            .find({ type: 'image' })
            .then((images) => {
                res.render('media/images', {
                    images: mongoosesToObject(images),
                });
            })
            .catch(next);
    }

    videos(req, res, next) {
        res.render('media/videos');
    }

    docs(req, res, next) {
        res.render('media/docs');
    }
}

module.exports = new mediaController();
