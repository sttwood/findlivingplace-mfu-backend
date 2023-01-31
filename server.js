const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { readdirSync, readdir } = require('fs')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const connectDB = require('./config/db')

const app = express()
// connect Database
connectDB()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '20mb' }))
app.use(cors())

// Routes
// http://localhost:5500/api/
readdirSync('./routes').map(
    (route) => app.use('/api', require('./routes/' + route))
)



const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is running on port ' + port)
}) 