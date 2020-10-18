import mongoose from 'mongoose';
const path = require('path');
const config = require('config-lite')(path.resolve(__dirname, '..'))

const db = mongoose.connect(config.url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = db