const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: Boolean,
    trim: true,
    default: false,
  },
  orders: {
    type: Array,
    default: [],
  },
}, {
  timestamps: true,
  versionKey: false,
});

const User = model('user', userSchema, 'users');

module.exports = {
  User,
}