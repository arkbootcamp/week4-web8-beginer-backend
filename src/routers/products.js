const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const auth = require('../middlewares/auth')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() - file.originalname)
  }
})

var upload = multer({ storage: storage })
router
  .get('/', auth.verifyAccess, productController.getProduct)
  .get('/:id', productController.getProductById)
  .post('/', upload.single('image'),productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:idProduct', productController.deleteProduct)

module.exports = router
