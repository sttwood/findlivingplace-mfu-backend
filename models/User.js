const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    telephone: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    favorite: [{
        type: ObjectId,
        ref: 'place'
    }],
}, { timestamps: true })

module.exports = User = mongoose.model('users', UserSchema)