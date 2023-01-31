const Place = require("../models/Place")

// POST
exports.createPost = async (req, res) => {
    try {
        const place = await new Place({
            title: req.body.title,
            description: req.body.description,
            water_bill: req.body.water_bill,
            electricity_bill: req.body.electricity_bill,
            category: req.body.category,
            categories: req.body.categories,
            price: req.body.price,
            carpark: req.body.carpark,
            free_wifi: req.body.free_wifi,
            pet: req.body.pet,
            gym: req.body.gym,
            washing_machine: req.body.washing_machine,
            airconditioner: req.body.airconditioner,
            telephone: req.body.telephone,
            facebook: req.body.facebook,
            line: req.body.line,
            images: req.body.images,
            location: req.body.location,

            email: req.body.email
        }).save()
        res.send(place)
    } catch (err) {
        res.status(500).send("Create place ERROR!!!" + err)
    }
}

// GET [All post]
exports.listPost = async (req, res) => {
    try {
        const count = parseInt(req.params.count)
        const place = await Place.find()
            .limit(count)
            .populate("category")
            .sort([ [ "createdAt", "desc" ] ])

        res.send(place)
    } catch (err) {
        res.status(500).send("List place ERROR!!!")
    }
}

// GET [One post]
exports.readPost = async (req, res) => {
    try {
        const place = await Place.findOne({ _id: req.params.id })
            .populate("category")
            .exec()

        res.send(place)
    } catch (err) {
        res.status(500).send("Read place ERROR!!!")
    }
}

// PUT
exports.updatePost = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec()
        res.send(place)
    } catch (err) {
        res.status(500).send("Update place ERROR!!!")
    }
}

// DELETE
exports.removePost = async (req, res) => {
    try {
        const deleted = await Place.findOneAndRemove({ _id: req.params.id }).exec()

        res.send(deleted)
    } catch (err) {
        res.status(500).send("Remove place ERROR!!!")
    }
}

exports.listByPost = async (req, res) => {
    try {
        const { sort, order, limit } = req.body

        const place = await Place.find()
            .limit(limit)
            .populate("category")
            .sort([ [ sort, order ] ])

        res.send(place)
    } catch (err) {
        res.status(500).send("ListBy place ERROR!!!")
    }
}

//หาด้วย text
const handleQuery = async (req, res, query) => {
    let places = await Place.find({ $text: { $search: query } })
        .populate("category", '_id name')
    res.send(places)
}

//หาด้วย price
const handlePrice = async (req, res, price) => {
    let places = await Place.find({
        price: {
            $gte: price[ 0 ],
            $lte: price[ 1 ]
        }
    })
        .populate("category", '_id name')
    res.send(places)
}

//หาด้วย category
const handleCategory = async (req, res, category) => {
    let places = await Place.find({ category })
        .populate("category", '_id name')
    res.send(places)
}

//หาด้วย facility
const handleCarpark = async (req, res, carpark) => {
    let places = await Place.find({ carpark })
        .sort([ [ "createdAt", "desc" ] ])
        .populate("category", '_id name')
    res.send(places)
}
const handlePet = async (req, res, pet) => {
    let places = await Place.find({ pet })
        .sort([ [ "createdAt", "desc" ] ])
        .populate("category", '_id name')
    res.send(places)
}
const handleFreeWifi = async (req, res, free_wifi) => {
    let places = await Place.find({ free_wifi })
        .sort([ [ "createdAt", "desc" ] ])
        .populate("category", '_id name')
    res.send(places)
}
const handleAirconditioner = async (req, res, airconditioner) => {
    let places = await Place.find({ airconditioner })
        .sort([ [ "createdAt", "desc" ] ])
        .populate("category", '_id name')
    res.send(places)
}
const handleGym = async (req, res, gym) => {
    let places = await Place.find({ gym })
        .sort([ [ "createdAt", "desc" ] ])
        .populate("category", '_id name')
    res.send(places)
}
const handleWashingMachine = async (req, res, washing_machine) => {
    let places = await Place.find({ washing_machine })
        .sort([ [ "createdAt", "desc" ] ])
        .populate("category", '_id name')
    res.send(places)
}

const handleAuthor = async (req, res, email) => {
    let places = await Place.find({  email  })
    .populate("category",'_id name')
    .sort([["createdAt", "desc"]])
    res.send(places)
}


exports.searchFilters = async (req, res) => {
    const { 
        query,
        price,
        category,
        carpark,
        pet,
        free_wifi,
        airconditioner,
        gym,
        washing_machine,
        email
    } = req.body

    if (query) {
        await handleQuery(req, res, query)
    }

    if (price !== undefined) {
        await handlePrice(req, res, price)
    }

    if (category) {
        await handleCategory(req, res, category)
    }

    if (carpark == true) {
        await handleCarpark(req, res, carpark)
    }

    if (pet == true) {
        await handlePet(req, res, pet)
    }

    if (free_wifi == true) {
        await handleFreeWifi(req, res, free_wifi)
    }

    if (airconditioner == true) {
        await handleAirconditioner(req, res, airconditioner)
    }

    if (gym == true) {
        await handleGym(req, res, gym)
    }

    if (washing_machine == true) {
        await handleWashingMachine(req, res, washing_machine)
    }

    if (email) {
        await handleAuthor(req, res, email)
    }
}

//facilities
exports.changeCarpark = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.body.id },
            { carpark: req.body.carpark }
        )
        res.send(place)
    } catch (err) {

        res.status(500).send("Server Error!")
    }
}

exports.changePet = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.body.id },
            { pet: req.body.pet }
        )
        res.send(place)
    } catch (err) {

        res.status(500).send("Server Error!")
    }
}

exports.changeFreeWifi = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.body.id },
            { free_wifi: req.body.free_wifi }
        )
        res.send(place)
    } catch (err) {

        res.status(500).send("Server Error!")
    }
}

exports.changeAirconditioner = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.body.id },
            { airconditioner: req.body.airconditioner }
        )
        res.send(place)
    } catch (err) {

        res.status(500).send("Server Error!")
    }
}

exports.changeGym = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.body.id },
            { gym: req.body.gym }
        )
        res.send(place)
    } catch (err) {

        res.status(500).send("Server Error!")
    }
}

exports.changeWashingMachine = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            { _id: req.body.id },
            { washing_machine: req.body.washing_machine }
        )
        res.send(place)
    } catch (err) {

        res.status(500).send("Server Error!")
    }
}