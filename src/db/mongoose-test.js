const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer

async function connect () {
  mongoServer = new MongoMemoryServer();
  const dbUrl = await mongoServer.getUri()
  await mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

async function disconnect () {
  await mongoose.disconnect()
  mongoServer.stop()
}

module.exports = {
  connect,
  disconnect
}