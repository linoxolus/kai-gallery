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
        gallery
        .find({ type: 'video' })
        .then((videos) => {
            res.render('media/videos', {
                videos: mongoosesToObject(videos),
            });
        })
        .catch(next);
    }

    docs(req, res, next) {
        res.render('media/docs');
    }
}

module.exports = new mediaController();
