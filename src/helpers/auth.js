const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '20s' }, function (err, token) {

      if(!err){
        resolve(token)
      }else{
        reject(err)
      }
    })
    // set cookie
    // res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    //   httpOnly: true,
    //   maxAge: 60 * 60,
    //   secure: false,
    //   path: '/',
    //   sameSite: 'strict'
    // }));
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGFtbWFkcmlzYW5vNUBnbWFpbC5jb20iLCJmdWxsbmFtZSI6InJyaXNhbm8iLCJyb2xlIjoyLCJpYXQiOjE2MjAxODgyODcsImV4cCI6MTYyMDE5MTg4N30.iKWjwtbOI9RRN8zCAHVOmfnXcCPWFveCQTuwlQdeLFI
  });
}
const generateRefreshToken= (payload)=>{
  return new Promise((resolve, reject)=>{
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    })
  })
}
const verifyRefreshToken = (token) =>{
  return new Promise ((resolve, reject)=>{
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
            reject(new Error('invalid signature'))
            // message: 'invalid signature'
        } else if (err.name === 'TokenExpiredError') {
          reject(new Error('jwt expired'))
        
        } else {
          reject(new Error('jwt not active'))
        }
      }
      resolve(decoded)
    })
  })
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
}