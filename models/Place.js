const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const PlaceSchema = new mongoose.Schema({
    // place name
    title: {
        type: String,
        text:true
    },
    description: {
        type: String
    },
    // expenses or bills
    water_bill: {
        type: Number
    },
    electricity_bill: {
        type: Number
    },
    // category
    category:{
        type:ObjectId,
        ref: "category"
    },
    // room price
    price: {
        type: Number
    },
    images: {
        type: Array
    },
    //facilities
    carpark: {
        type: Boolean
    },
    free_wifi: {
        type: Boolean
    },
    pet: {
        type: Boolean
    },
    gym: {
        type: Boolean
    },
    washing_machine: {
        type: Boolean
    },
    airconditioner: {
        type: Boolean
    },
    // contact
    telephone: {
        type: String
    },
    facebook: {
        type: String
    },
    line: {
        type: String
    },
    location: {
        type: String
    },
    email: {
            type: String,
            ref: "users"
    }

},
    {timestamps: true }
)
module.exports = Place = mongoose.model('place', PlaceSchema)