const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app

if(process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // static file-serving middleware
  // app.use(express.static(path.join(__dirname, '..', 'public')))

  // // any remaining requests with an extension (.js, .css, etc.) send 404
  // app.use((req, res, next) => {
  //   if (path.extname(req.path).length) {
  //     const err = new Error('Not found')
  //     err.status = 404
  //     next(err)
  //   } else {
  //     next()
  //   }
  // })

  // // sends index.html
  // app.use('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  // })
  
  app.use('/api', require('./api'))

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}