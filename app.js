require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const morgan = require('morgan')
const product = require('./src/routers/users')
const routerUsers = require('./src/routers/users')
const productRouter = require('./src/routers/products')
// const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
const route =require('./src/routers')
const createError = require('http-errors')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// app.use(myModuleMid)

// router user
// app.use('/users', routerUsers)
// app.use('/products', productRouter)
app.use('/v1', route)

app.use('/img', express.static('./uploads'))

app.use('*', (req, res, next)=>{
  const error = new createError.NotFound()
  next(error)
})
// error handling
app.use((err, req, res, next)=>{
  if(!err.status){
    err.status = 500
  }
  res.json({
    message: err.message,
    status_error: err.status
  })
})

app.listen(port, () => {
  console.log('server is running port ' + port)
})


// 'http://localhost:8000/v1/movie/'