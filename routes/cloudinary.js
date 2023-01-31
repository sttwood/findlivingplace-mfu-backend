const express = require('express');
const router = express.Router();

//controllers
const { createImage, removeImage } = require('../controllers/cloudinary')

//middleware
const {auth} = require('../middlewares/auth')

//@endpoint http://localhost:5500/api/images
router.post('/images', auth, createImage)
router.post('/removeimages', auth, removeImage)




module.exports = router