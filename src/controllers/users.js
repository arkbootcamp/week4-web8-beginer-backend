const { v4: uuidv4 } = require('uuid')
const userModel = require('../models/users')
const helpers = require('../helpers/helper')
const common = require('../helpers/common')
const bcrypt = require('bcryptjs')
const helperEamil = require('../helpers/email')
// const cookie = require('cookie')
const helperAuth = require('../helpers/auth')

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
    const payload = { 
      email: user.email,
      fullname: user.fullname, 
      role: 2 // ambil dari db
    }
    const token = await helperAuth.generateToken(payload)
    const refreshToken = await helperAuth.generateRefreshToken(payload)
    
    console.log(refreshToken);
    user.token = token
    user.refreshToken = refreshToken
    return helpers.response(res, user, 200, null)
    
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

const refreshToken = async (req, res)=>{
  const tokenRefresh = req.body.refreshToken
  try {
    const decodedRefresh = await helperAuth.verifyRefreshToken(tokenRefresh)
    const tokenData = {
      email: decodedRefresh.email,
      fullname : decodedRefresh.fullname,
      role : decodedRefresh.role
    }
    const token = await helperAuth.generateToken(tokenData)
    const refreshToken = await helperAuth.generateRefreshToken(tokenData)
    const data = {
      token,
      refreshToken
    }
    return helpers.response(res, data, 200, null)
  } catch (error) {
    return helpers.response(res, { message: error.message }, 401, null)
  }
}

module.exports = {
  login,
  register,
  getAllUser,
  sendEmail,
  refreshToken
}
