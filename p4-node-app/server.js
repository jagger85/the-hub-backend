const express = module.require('express')
const mongoose = module.require('mongoose')
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.SERVER_PORT
const password = process.env.ATLAS_PASS
const routes = require('./Routes/Routes');

server.use( bodyParser.json() ); // This solves getting the body of the request
server.use( cors() ); // Solves communication by other software
server.use( '' , routes )

mongoose.connect(`mongodb+srv://jagger85:${password}@cluster0.xpmumyt.mongodb.net/crmdb`)

server.listen( PORT, () => { console.log(`Server is running on port ${PORT}`); })
