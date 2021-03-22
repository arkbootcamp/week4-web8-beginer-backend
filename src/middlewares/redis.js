const redis = require('redis')
const client = redis.createClient(6379)
const helper = require('../helpers/helper')

const cacheAllProduct = (req, res, next)=>{
    client.get('getAllProduct', (err, data)=>{
      console.log('isinya apa', data);
      if(data !== null){
        const result = JSON.parse(data)
        return helper.response(res, result, 200, null)
      }else{
        next()
      }
    })
}
const clearAllProduct = (req, res, next) =>{
  client.del("getAllProduct")
  next()
}

module.exports={
  cacheAllProduct,
  clearAllProduct
}