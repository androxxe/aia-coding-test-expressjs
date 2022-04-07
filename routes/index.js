const express = require('express')
const router = express.Router();
var PublicPhotosController = require('../controllers/PublicPhotosController');

router.get('/', PublicPhotosController.GetPhotos)

module.exports = router