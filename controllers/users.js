const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


// GET [All]
exports.userList = async (req, res) => {
    try {
        // Code
        const user = await User.find({}).select('-password').exec()
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// GET [One]
exports.userRead = async (req, res) => {
    try {
        // Code
        const id = req.params.id
        const user = await User.findOne({ _id: id }).select('-password').exec()
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// PUT
exports.changePassword = async (req, res) => {
    try {
        // Code
        var { id, password } = req.body.Passwordvalues
        // 1 gen salt
        const salt = await bcrypt.genSalt(10)
        // 2 encrypt
        var enPassword = await bcrypt.hash(password, salt)

        const user = await User.findOneAndUpdate(
            { _id: id },
            { password: enPassword }
        )
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}
// PUT [Edit Profile]
// First Name
exports.changeFirstname = async (req, res) => {
    try {
        var { id, firstname } = req.body.FirstNamevalues
        const user = await User.findOneAndUpdate(
            { _id: id },
            { firstname: firstname }
        )
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error!")
    }
}
// Last Name
exports.changeLastname = async (req, res) => {
    try {
        var { id, lastname } = req.body.LastNamevalues;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { lastname: lastname }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};
// Telephone
exports.changeTelephone = async (req, res) => {
    try {
        var { id, telephone } = req.body.Telephonevalues;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { telephone: telephone }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

// DELETE
exports.userDelete = async (req, res) => {
    try {
        // Code
        const id = req.params.id
        const user = await User.findOneAndDelete({ _id: id })
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// POST [Change Status]
exports.changeStatus = async (req, res) => {
    try {
        // Code
        console.log(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { enabled: req.body.enabled }
        )
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

// POST [Change Role]
exports.changeRole = async (req, res) => {
    try {
        // Code
        console.log(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { role: req.body.role }
        )
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}



// POST [Add Favorite]
exports.addToFavorite = async (req, res) => {
    try {
        const { placeId } = req.body
        let user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $addToSet: { favorite: placeId } }
        ).exec()
        res.send(user)
    } catch (err) {
        res.status(500).send("Add favorite place Error!")
    }
}
// GET [Get Favorite]
exports.getFavorite = async (req, res) => {
    try {
        let list = await User.findOne({ email: req.user.email })
            .select('favorite')
            .populate('favorite')
            .exec()
        res.json(list)
    } catch (err) {
        res.status(500).send("Get favorite place Error!")
    }
}
// DELETE [Delete Favorite]
exports.removeFavorite = async (req, res) => {
    try {
        const { placeId } = req.params
        let user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $pull: { favorite: placeId } }
        ).exec()
        res.send(user)
    } catch (err) {
        res.status(500).send("Get favorite place Error!")
    }
}