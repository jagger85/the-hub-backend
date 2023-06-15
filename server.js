const express = module.require('express')
const mongoose = module.require('mongoose')
const server = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.SERVER_PORT
const MONGO_DB = process.env.MONGO_DB
const routes = require('./Routes/Routes')
const helmet = require('helmet')
const morgan = require('morgan')

server.use(morgan('tiny'))
server.use(helmet())
server.use(bodyParser.json()) // This solves getting the body of the request
server.use(cors()) // Solves communication by other software
server.use('', routes)

mongoose.connect(MONGO_DB)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
