const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.getIndexPage);
router.get('/settings', indexController.getSettingsPage);
router.get('/howtouse', indexController.getHowToUsePage);

router.get('/liverecognition', indexController.getLiveRecognitionPage);
router.get('/imagerecognition', indexController.getImageRecognitionPage);

module.exports = router;