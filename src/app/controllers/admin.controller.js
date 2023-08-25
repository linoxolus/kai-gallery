const gallery = require('../models/gallery.model');
const { getValidPath, getMinPath } = require('../../utils/path.util');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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
        var minPath = getMinPath(req.files[0].path);
        const filePath = path.join(
            __dirname,
            '../../public/media/images/',
            req.files[0].filename
        );
        const minFilePath = path.join(
            __dirname,
            '../../public/media/images/min/',
            req.files[0].filename
        );
        gallery
            .create({
                name: req.files[0].originalname,
                image: getValidPath(req.files[0].path),
                minimage: getValidPath(minPath),
                size: req.files[0].size,
                mimetype: req.files[0].mimetype,
                type: req.files[0].mimetype.split('/')[0],
            })
            .then(() => {
                if (req.files[0].mimetype.split('/')[0] === 'image') {
                    sharp(filePath)
                        .jpeg({ quality: 40 })
                        .toFile(minFilePath)
                        .then(() => {
                            res.status(201).json({
                                message: 'success',
                            });
                        })
                        .catch(next);
                } else {
                    res.status(201).json({
                        message: 'success',
                    });
                }
            })
            .catch(next);
    }
}

module.exports = new adminController();
