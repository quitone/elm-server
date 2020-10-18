const user = require('../controller/user/user');
const { Router } = require('express');

const route = new Router()

route.post('/login', user.login)
route.post('/register', user.register)

module.exports = route