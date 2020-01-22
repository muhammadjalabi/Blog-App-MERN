const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
};

const UserSchema = new Schema(User);

module.exports = mongoose.model('users', UserSchema)