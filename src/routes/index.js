// const admin = require('./admin');
// const city = require('./city');
const user = require('./user');
module.exports = (app) => {
  // app.use(admin)
  // app.use(city)
  app.use('/user', user)
}