const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helper') 

const verifyAccess =(req, res, next)=>{
  const authorization = req.headers.authorization
  if (!authorization){
    return helpers.response(res, null, 401, {
      message: 'Server, Need Token!'
    })
  }

  let token = authorization.split(" ")
  token = token[1]

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err){
      if (err.name === 'JsonWebTokenError'){
        return helpers.response(res, null, 401, {
          message: 'invalid signature'
        })
      } else if (err.name ==='TokenExpiredError'){
        return helpers.response(res, null, 401, {
          message: 'jwt expired'
        })
      }else{
        return helpers.response(res, null, 401, {
          message: 'jwt not active'
        })
      }
    }
    console.log(decoded);
    req.email = decoded.email
    next()
  });
}
module.exports = {
  verifyAccess
}