const express = require('express')
const router = express.Router();
const PublicPhotosController = require('../controllers/PublicPhotosController');

router.get('/', PublicPhotosController.GetPhotos)

module.exports = router