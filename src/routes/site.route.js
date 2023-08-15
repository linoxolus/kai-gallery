const router = require('express').Router();
const siteController = require('../app/controllers/site.controller');

router.get('/', siteController.index);

module.exports = router;
