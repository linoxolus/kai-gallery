const router = require('express').Router();
const adminController = require('../app/controllers/admin.controller');
const upload = require('../app/middleware/multer.middleware');

router.get('/upload', adminController.upload);
router.get('/list', adminController.list);
router.post('/store', upload.array('files') , adminController.store);

module.exports = router;
