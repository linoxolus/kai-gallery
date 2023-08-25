const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, 'src/public/media/images/origin');
        } else if (file.mimetype.startsWith('video')) {
            cb(null, 'src/public/media/videos');
        } else if (file.mimetype.startsWith('text')) {
            cb(null, 'src/public/media/docs');
        } else {
            cb(null, 'src/public/uploads'); // Mặc định cho các loại tệp khác
        }
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
                '-' +
                Date.now() +
                path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

module.exports = upload;
