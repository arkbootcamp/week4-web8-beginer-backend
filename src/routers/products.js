const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const auth = require('../middlewares/auth')
const {uploadMulter} = require('../middlewares/multer')
const {cacheAllProduct, clearAllProduct} = require('../middlewares/redis')


router
  .get('/', auth.verifyAccess, cacheAllProduct, productController.getProduct)
  .get('/:id', productController.getProductById)
  .post('/', uploadMulter.single('image'),clearAllProduct,productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:idProduct', productController.deleteProduct)

module.exports = router
