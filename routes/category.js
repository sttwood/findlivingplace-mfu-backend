const express = require('express');
const router = express.Router();

//controllers
const {
    listCategory,
    createCategory,
    readCategory,
    updateCategory,
    removeCategory
} = require('../controllers/category')

//middleware
const {auth, adminCheck} = require('../middlewares/auth')

//@endpoint http://localhost:5500/api/category
router.get('/category', listCategory)

router.post('/category', auth, adminCheck, createCategory)

router.get('/category/:id', auth, adminCheck, readCategory)

router.put('/category/:id', auth, adminCheck, updateCategory)

router.delete('/category/:id', auth, adminCheck, removeCategory)





module.exports = router