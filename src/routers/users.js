const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router
  .post('/login', userController.login)
  .get('/', userController.getAllUser)
  .post('/register', userController.register)
  .post('/email', userController.sendEmail)
  .post('/refresh-token', userController.refreshToken)

module.exports = router

// const deleteProduct = ()=>{
//   console.log('ini delte product');
// }

// const getProduct = ()=>{
//   console.log('ini get product');
// }
// module.exports = {
//   deleteProduct,
//   getProduct
// }
// module.exports.getProduct = getProduct
// module.exports.deleteProduct = deleteProduct

// exports.deleteProduct = ()=>{
//   console.log('ini delte product');
// }

// exports.getProduct = ()=>{
//   console.log('ini get product');
// }
