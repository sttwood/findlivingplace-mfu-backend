const express = require('express')
const router = express.Router()

//controllers
const {
    createPost,
    listPost,
    removePost,
    readPost,
    updatePost,
    listByPost,
    searchFilters
} = require('../controllers/place')

//middleware
const { auth } = require('../middlewares/auth')

//@endpoint http://localhost:5500/api/place
router.post('/place', auth, createPost)
router.get('/place/:count', listPost)
router.delete('/place/:id', auth, removePost)

//Update
//@endpoint http://localhost:5500/api/places
router.get('/places/:id', readPost)
router.put('/place/:id', auth, updatePost)

//@endpoint http://localhost:5500/api/placeby
router.post('/placeby', listByPost)

//Search
//@endpoint http://localhost:5500/api/search/filters
router.post('/search/filters',searchFilters)




module.exports = router