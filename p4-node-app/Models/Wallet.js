import mongoose from 'mongoose';
const { Schema } = mongoose;

const wallet = new Schema({
    Alias: String,
    Address: String
})

module.exports = mongoose.model('Wallet', wallet);