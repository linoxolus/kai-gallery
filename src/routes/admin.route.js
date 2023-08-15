const router = require('express').Router();
const adminController = require('../app/controllers/admin.controller');

router.get('/upload', adminController.upload);
router.get('/list', adminController.list);

module.exports = router;
