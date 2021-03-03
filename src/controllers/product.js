const productModels =require('../models/products')

exports.getProduct = (req, res) => {
  productModels.getProducts()
  .then((result)=>{
    res.json({
      data:result
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}

exports.updateProduct = (req, res) => {
  const idProduct = req.params.id
  const {name, description, price} = req.body

  const data = {
    name,
    description,
    price,
    updatedAt: new Date()
  }
  productModels.updateProduct(idProduct, data)
  .then((result)=>{
    res.json({
      data: result
    })
  })
  .catch((err)=>{
    console.log(err);
  })

}

exports.insertProduct = (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const price = req.body.price
  const data = {
    name,
    description,
    price,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  productModels.insertProduct(data)
  .then((result)=>{
    res.json({
      data: result
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}

exports.deleteProduct = (req, res) => { 
  const idProduct = req.params.idProduct
  productModels.deleteProduct(idProduct)
  .then((result)=>{
    res.json({
      data: result
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}

exports.getProductById =(req, res)=>{
  const idProduct = req.params.id
  productModels.getProductById(idProduct)
  .then((result)=>{
    res.json({
      data: result
    })
  })
}