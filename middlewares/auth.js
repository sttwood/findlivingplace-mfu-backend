const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.auth = (req, res, next) => {
    try {
        const token = req.headers[ 'authtoken' ]
        // token checked
        if (!token) {
            return res.status(401).send('No token, authorization are denied')
        }
        // decode token
        const decoded = jwt.verify(token, 'jwtSecret')

        console.log('middleware', decoded)
        req.user = decoded.user
        next()

    } catch (err) {
        console.log(err)
        res.status(401).send('Token Invavid!!')
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const adminUser = await User.findOne({ email }).exec()
        if (adminUser.role !== 'admin') {
            res.status(403).send(err, 'Admin Access denied')
        } else {
            next()
        }
    } catch (err) {
        console.log(err);
        res.status(401).send("Admin Access denied");
    }
}