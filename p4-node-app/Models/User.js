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
});

const portfolio = new Schema({
  alias: {
    type: String,
    required: true,
  },
  wallets: [wallet],
});

const user = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    inmutable: true,
    default: () => Date.now(),
  },

  currency: {
    type: String,
    default: 'USD',
  },
  preferredPortfolio: {
    type: String,
    default: null,
  },

  portfolios: [portfolio],

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

user.pre('find', function () {
  this.where({ isDeleted: false });
});

user.pre('findOne', function () {
  this.where({ isDeleted: false });
});

module.exports = mongoose.model('User', user);
