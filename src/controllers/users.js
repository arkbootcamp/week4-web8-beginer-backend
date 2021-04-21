const { v4: uuidv4 } = require('uuid')
const userModel = require('../models/users')
const helpers = require('../helpers/helper')
const common = require('../helpers/common')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const helperEamil = require('../helpers/email')
const cookie = require('cookie')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userModel.findUser(email)
    if (result.length === 0) {
      return helpers.response(res, null, 401, { email: 'email dan password anda salah' })
    }
    const user = result[0]
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return helpers.response(res, null, 401, { email: 'email dan password anda salah' })
    }
    delete user.password;
    
    // lulus pengecekan
    // generet token
    const payload = { email: user.email, fullname: user.fullname }
    jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h' }, function (err, token) {
      user.token = token

      // set cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 60 * 60,
        secure: false,
        path: '/',
        sameSite: 'strict'
      }));
      return helpers.response(res, user, 200, null)
    });
    
  } catch (error) {
    console.log(error);
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}

const register = async (req, res) => {  
  try {
    const { email, password, fullname } = req.body
    const result = await userModel.findUser(email)
    if (result.length !==0){
      return helpers.response(res, null, 401, {email: 'email sudah ada'})
    }
    const data ={
      id: uuidv4(),
      email,
      password: await common.hashPassword(password),
      fullname,
      phone: ''
    }
    const resultInsert = await userModel.insertUser(data)
    return helpers.response(res, resultInsert, 401, null)
  } catch (error) {
    console.log(error);
    return helpers.response(res, null, 500, {message: 'Internal Server Error'})
  }
  
}
const sendEmail = async(req, res)=>{
  const resEmail = await helperEamil.sendEmail('muhammadrisano@gmail.com', 'ini pembayaran tiket bla bla')
  console.log(resEmail);
  res.json({
    status: 'success'
  })
}
const getAllUser = (req, res) => {
  res.send('tampil semua user')
}

module.exports = {
  login,
  register,
  getAllUser,
  sendEmail
}
