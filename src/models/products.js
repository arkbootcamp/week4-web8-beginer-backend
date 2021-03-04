const connection = require('../configs/db')

const product = {
  getProducts:()=>{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT products.*, category.name AS nameCategory FROM products INNER JOIN category ON products.idCategory = category.id;', (err, results) => {
        if(!err){
          resolve(results)
        }else{
          reject(err)
        }
      })
    })
  },
  // SELECT * FROM `products` WHERE id=3
  getProductById:(id)=>{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT products.*, category.name AS nameCategory FROM products INNER JOIN category ON products.idCategory = category.id WHERE products.id = ?',id , (err, results) => {
        if (!err) {
          resolve(results)
        } else {
          reject(err)
        }
      })
    })
  },
  insertProduct:(data)=>{
    return new Promise((resolve, reject)=>{
      connection.query('INSERT INTO products SET ?', data, (err, result)=>{
        if(!err){
          resolve(result)
        }else{
          reject(err)
        }
      })
    })
  },
  deleteProduct:(id)=>{
    return new Promise((resolve, reject)=>{
      connection.query('DELETE FROM products WHERE id = ?', id, (err, results)=>{
        if(!err){
          resolve(results)
        }else{
          reject(err)
        }
      })
    })
  },
  updateProduct:(id, data)=>{
    return new Promise((resolve, reject)=>{
      connection.query('UPDATE products SET ? WHERE id = ?', [data, id], (err, result)=>{
        if(!err){
          resolve(result)
        }else{
          reject(err)
        }
      })
    })
  }
}

module.exports = product