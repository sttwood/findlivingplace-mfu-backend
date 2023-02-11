const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb + srv://settawut:rKYsbz124JjlEamM@findlivingplacedb.ald2hxs.mongodb.net/db_authen')
        console.log('Connect db successfully.')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB