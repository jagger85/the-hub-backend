const mongoose = require('mongoose');
const { Schema } = mongoose;


const portfolio = new Schema({
    alias: {
        type: String,
        required: true,
    },
    wallets:[{type: mongoose.Schema.Types.ObjectId,ref:'Wallet'}]
})

module.exports = mongoose.model('Portfolio', portfolio);