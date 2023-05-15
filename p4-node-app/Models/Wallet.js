const mongoose = require('mongoose');
const { Schema } = mongoose;

const wallet = new Schema({
    alias: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Wallet', wallet);