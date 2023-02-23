const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dpl9wgyem',
    api_key: '437185226335457',
    api_secret: '0TwofY5gR7OiHs3P91J5ImVvtk4'
})

// POST
exports.createImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: Date.now(),
            resource_type: 'auto',
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Upload image Error!')
    }
}

// DELETE
exports.removeImage = async (req, res) => {
    try {
        let image_id = req.body.public_id
        cloudinary.uploader.destroy(image_id, (result) => {
            res.send(result)
        })

    } catch (err) {
        console.log(err)
        res.status(500).send('Remove image Error!')
    }
}