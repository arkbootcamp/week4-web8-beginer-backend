const productModels = require('../models/products')
const helpers = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')
const redis = require('redis')
const client = redis.createClient(6379)

exports.getProduct = (req, res, next) => {
  productModels.getProducts()
    .then((result) => {
      const resultProduct = result
      client.setex("getAllProduct", 60 * 60 * 12, JSON.stringify(resultProduct))
      // setTimeout(()=>{
        return helpers.response(res, resultProduct, 200)
      // }, 2000)
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
  console.log(req.file);
  const { name, description, price, idCategory } = req.body
  console.log(uuidv4())
  const data = {
    id: uuidv4(),
    name,
    description,
    price,
    image: `http://localhost:4500/img/${req.file.filename}`,
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
      const dataResult = result
      client.setex(`product_${idProduct}`,  60 * 60 * 12, JSON.stringify(resultProduct))
      helpers.response(res, dataResult, 200)
    })
}
