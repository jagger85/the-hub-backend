const mongoose = require('mongoose');
const { Schema } = mongoose;

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

    portfolios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Portfolio'
        }
    ]
})

module.exports = mongoose.model('User', user);