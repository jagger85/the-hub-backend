const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({

    username: String,
    email: String,
    password: String,
    Settings: {currency:  String},
    Portfolios: [{type: mongoose.Schema.Types.ObjectId,ref:'Portfolio'}]
})

module.exports = mongoose.model('User', user);