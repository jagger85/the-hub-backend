const mongoose = require('mongoose');
const { Schema } = mongoose;

const wallet = new Schema({
    alias: String,
    address: String
})

module.exports = mongoose.model('Wallet', wallet);