const productModels = require('../models/products')
const helpers = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')

exports.getProduct = (req, res, next) => {
  // const page = parseIn(req.query.page) || 1
  // const limit = parseInt(req.query.limit) || 8
  // const sort = req.query.sort
  // const search = req.query.search
  // const offsite = (page -1)*limit
  productModels.getProducts()
    .then((result) => {
      const resultProduct = result
      helpers.response(res, resultProduct, 200)
    })
    .catch((err) => {
      const error = new createError.InternalServerError()
      next(error)
    })
}

exports.updateProduct = (req, res) => {
  const idProduct = req.params.id
  const { name, description, price } = req.body

  const data = {
    name,
    description,
    price,
    updatedAt: new Date()
  }

  productModels.updateProduct(idProduct, data)
    .then((result) => {
      helpers.response(res, result, 200)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.insertProduct = (req, res) => {
  // const name = req.body.name
  // const description = req.body.description
  // const price = req.body.price
  const { name, description, price, idCategory } = req.body
  console.log(uuidv4())
  const data = {
    id: uuidv4(),
    name,
    description,
    price,
    idCategory,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  productModels.insertProduct(data)
    .then((result) => {
      helpers.response(res, result, 200)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteProduct = (req, res) => {
  const idProduct = req.params.idProduct
  productModels.deleteProduct(idProduct)
    .then((result) => {
      helpers.response(res, result, 200)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getProductById = (req, res) => {
  const idProduct = req.params.id
  productModels.getProductById(idProduct)
    .then((result) => {
      helpers.response(res, result, 200)
    })
}
