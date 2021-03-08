const express = require('express')
const route = express.Router()
const routeUser = require('./users')
const routeProduct = require('./products')

route.use('/users', routeUser)
route.use('/products',routeProduct)

module.exports = route