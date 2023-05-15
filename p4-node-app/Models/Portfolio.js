import mongoose from 'mongoose';
const { Schema } = mongoose;


const portfolio = new Schema({
    Alias: String,
    Wallets:[{type: mongoose.Schema.Types.ObjectId,ref:'Wallet'}]
})

module.exports = mongoose.model('Portfolio', portfolio);