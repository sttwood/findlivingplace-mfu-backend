const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// POST [Register]
exports.register = async(req, res) => {
    try{
       // Check user
        const { email, password, firstname, lastname, telephone } = req.body
        var user = await User.findOne({ email })
        if (user) {
            return res.status(400).send('User already exists')
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            email,
            password,
            firstname,
            lastname,
            telephone
        })
        // Encrypt
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        
        

        res.send('Register Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// POST [Login]
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        var user = await User.findOneAndUpdate({ email }, { new: true })
        if (user && user.enabled) {
            // Check Password
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('Password Invalid!!')
            }
            // Payload
            const payload = {
                user: {
                    _id: user._id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    telephone: user.telephone,
                    role: user.role,
                },
            }
            // Generate Token
            jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.json({ token, payload })
            })
        } else {
            return res.status(400).send('User Not found!!!')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// POST [Current User]
exports.currentUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
            .select('-password')
            .exec()
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// GET [User List]
exports.userList = async(req, res) => {
    try{
        res.send('User list')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// Edit user
exports.editUser = async(req, res) => {
    try{
        res.send('Edit user')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// Delete user
exports.deleteUser = async(req, res) => {
    try{
        res.send('Delete user')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

