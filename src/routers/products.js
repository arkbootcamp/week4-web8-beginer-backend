const express = require('express')
const router = express.Router()
const productController = require('../controllers/product') 

router
  .get('/', productController.getProduct)
  .get('/:id', productController.getProductById)
  .post('/', productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:idProduct', productController.deleteProduct)

module.exports = router