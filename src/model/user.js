const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
  id: Number,
  username: String,
  password: String,
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel