const express = require('express')
const router = express.Router()

//controller
const {
    userList,
    userRead,
    changePassword,
    changeFirstname,
    changeLastname,
    changeTelephone,
    userDelete,
    changeStatus,
    changeRole,

    addToFavorite,
    getFavorite,
    removeFavorite,
} = require('../controllers/users')

// middleware
const { auth, adminCheck } = require('../middlewares/auth')


//@Method    GET [All]
//@Endpoint  http://localhost:5500/api/users
//@Access    Private
router.get('/users', auth, adminCheck, userList)

//@Method    GET [One]
//@Endpoint  http://localhost:5500/api/users/:id
//@Access    Private
router.get('/users/:id', auth, userRead)

//@Method    PUT
//@Access    Private
//@Endpoint  http://localhost:5500/api/users/edit-password/:id
router.put('/users/edit-password/:id', auth, changePassword)
//@Endpoint  http://localhost:5500/api/users/edit-firstname/:id
router.put('/users/edit-firstname/:id', auth, changeFirstname)
//@Endpoint  http://localhost:5500/api/users/edit-lastname/:id
router.put('/users/edit-lastname/:id', auth, changeLastname)
//@Endpoint  http://localhost:5500/api/users/edit-telephone/:id
router.put('/users/edit-telephone/:id', auth, changeTelephone)

//@Method    DELETE
//@Endpoint  http://localhost:5500/api/users/:id
//@Access    Private
router.delete('/users/:id', auth, adminCheck, userDelete)

//@Method    POST [Change Status]
//@Endpoint  http://localhost:5500/api/change-status
//@Access    Private
router.post('/change-status', auth, adminCheck, changeStatus)

//@Method    POST [Change Role]
//@Endpoint  http://localhost:5500/api/change-role
//@Access    Private
router.post('/change-role', auth, adminCheck, changeRole)

//favorite
router.post('/user/favorite', auth, addToFavorite)
router.get('/user/favorite', auth, getFavorite)
router.put('/user/favorite/:placeId', auth, removeFavorite)



module.exports = router
