const router = require('express').Router();
const mediaController = require('../app/controllers/media.controller');

router.get('/images', mediaController.images);
router.get('/videos', mediaController.videos);
router.get('/docs', mediaController.docs);
router.get('/', mediaController.index);

module.exports = router;