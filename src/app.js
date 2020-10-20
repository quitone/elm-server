require('@babel/register');
const path = require('path');
// const config = require('config-lite');
const configLite = require('config-lite');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const router = require('./routes');
if (process.env.NODE_ENV !== 'stage') {
  require('./db/index');
}
// const express = require('express');

const config = configLite(__dirname)
const app = new express()

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'
  res.header('Access-Control-Allow-Origin', allowOrigin)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-Request-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credential', 'true')
  res.header("X-Powered-By", 'Express')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

const MongoStore = connectMongo(session)
app.use(cookieParser())
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.url
  })
}))
router(app)
function listen() {
  const server = app.listen(config.port, () => {
    console.log(`成功监听端口：${config.port}`);
  })
  return server
}

if (process.env.NODE_ENV !== 'stage') {
  listen()
}

module.exports = { app, listen }