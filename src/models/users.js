const connection = require('../configs/db')

const checkEmail = (email)=>{
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(email) AS countEmail FROM users WHERE email = ?', email, (err, results) => {
      if (!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })
  })
}
const findUser = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
      if (!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })
  })
}
const insertUser = (data)=>{
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', data, (err, results) => {
      if (!err) {
        resolve(results)
      } else {
        reject(err)
      }
    })
  })
}
module.exports = {
  checkEmail,
  insertUser,
  findUser
}