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

const portfolio = new Schema({
    alias: {
        type: String,
        required: true,
    },
    wallets:[wallet]
})



const user = new Schema({

    username: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        inmutable: true,
        default: () => Date.now()
    },

    settings: {
        currency:  String
    },

    portfolios: [portfolio]
})

module.exports = mongoose.model('User', user);