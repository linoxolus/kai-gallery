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
    store(req, res, next) {
        res.status(201).json({
            message: "success"
        })
        console.log(req.body);
    }
}

module.exports = new adminController();