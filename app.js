const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const product = require('./src/routers/users')
const routerUsers = require('./src/routers/users')
const productRouter = require('./src/routers/products')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// const myModuleMid =(req, res, next)=>{
//   console.log('module midle saya berjalan');
//   // next()
//   res.send('helo mid berhenti')
// }
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
// app.use(myModuleMid)


// router user
app.use('/users', routerUsers)
app.use('/products', productRouter)



app.listen(port, ()=>{
  console.log('server is running port '+ port);
})

















// app.get('/product', (req, res)=>{
//   // res.send('hello world')
//   const name = req.query.name
//   const email = req.query.email
//   res.json({
//     name: name,
//     emai: email
//   })
// })

// app.get('/user/:idUserbaru', (req, res)=>{
//   const idUser = req.params.idUserbaru
//   const cobaHeader = req.headers.cobaheader
//   res.send(cobaHeader)
// })

// app.post('/products', (req, res)=>{
//   // res.send('hello ini product method post')
//   console.log(req.body);
//   const name = req.body.name + " new"
//   const description = req.body.description + " new"
//   const price = req.body.price * 2
//   console.log(name);
//   res.json({
//     name, 
//     description: description, 
//     price: price
//   })
// })