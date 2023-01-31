const express = require('express')
const router = express.Router()

// Controllers
const { 
    register, 
    login, 
    currentUser,
    userList, 
    editUser, 
    deleteUser, 
} = require('../controllers/auth')

// Middlewares
const { auth, adminCheck } = require('../middlewares/auth');


//@Method     POST [Register]
//@Endpoint   http://localhost:5500/api/register
//@Access     Publish
router.post('/register', register)

//@Method     POST [Login]
//@Endpoint   http://localhost:5500/api/login
//@Access     Publish
router.post('/login', login)

//@Method     POST [Current User]
//@Endpoint   http://localhost:5500/api/current-user
//@Access     Private
router.post('/current-user', auth, currentUser)

//@Method     POST [Current Admin]
//@Endpoint   http://localhost:5500/api/current-admin
//@Access     Private
router.post('/current-admin', auth, adminCheck, currentUser)

//@Method     GET [All]
//@Endpoint   http://localhost:5500/api/auth
//@Access     Publish
router.get('/auth', userList)

//@Endpoint http://localhost:5500/api/auth
//@Method   PUT
//@Access   Publish
router.put('/auth', editUser)

//@Endpoint http://localhost:5500/api/auth
//@Method   POST
//@Access   Publish
router.delete('/auth', deleteUser)


module.exports = router