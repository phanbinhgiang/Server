import './globals'
import http from 'http'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { connectDatabase } from './common/connectDB'
// Routes
import get from 'lodash/get'

import i18n from 'i18n'
import json2xls from 'json2xls'
import cluster from 'cluster'
import { mess500 } from './source/middleware/constants'
// Elastic
import 'express-async-errors'
import MiddlewareServices from './source/middleware'

// Swagger
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { Server } from 'socket.io'
const app = express()

app.use(json2xls.middleware)
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(cookieParser())

app.use(express.json({ limit: '15MB' }))
app.use(express.urlencoded({
  extended: true
}))

var userAgent = require('express-useragent')
app.use(userAgent.express())
app.use(MiddlewareServices.blockIPandUser)

const numCPUs = process.env.NUM_CPU ? parseFloat(process.env.NUM_CPU) : require('os').cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  startWorkers()
} else {
  const server = http.createServer(app).listen(process.env.PORT)
  // Timeout 2 minutes
  // server.timeout = 240000
  const isOverTime = process.env.IS_OVERTIME_FETCH === 'true'
  server.timeout = isOverTime ? 1000 * 60 : 1000 * 10
  // server.timeout = 2147483647
  console.log(`Worker ${process.pid} started`)

  // Phòng chat
  const rooms = []

  // Connect socket
  const io = new Server(server)
  io.on('connection', socket => {
  // Event join room
    socket.on('amberblocks_join', data => {
      const { id, room } = data
      const socketId = id + Date.now()
      // socket.id = socketId;

      console.log(id, 'join room', room)

      // Event Join room

      if (rooms[room] === undefined) {
        rooms[room] = [{ id, time: new Date() }]
      } else {
        rooms[room] = [...rooms[room], { id, time: new Date() }]
        console.log('🚀 ~ file: app.js:35 ~ rooms[room]:', rooms[room])
      }
      socket.join(room)

      io.to(room).emit('messageJoin', `${id} joined room ${room}`)
    })

    // Event publish post and out room
    socket.on('amberblocks_update', data => {
      const { id, room, type } = data

      // Remove user from room
      if (rooms[room]) {
        rooms[room] = rooms[room].filter(item => item.id !== id)

        // Leave room
        socket.leave(room)

        // Notify users in room
        if (type === 'publish') {
          io.to(room).emit('messagePublished', {
            user: id
          })
        }
      }
    })

    // Event get Room
    socket.on('amberblocks_get', data => {
      const { room } = data
      console.log('get room', rooms[room] || [])
      io.to(room).emit('getRoom', rooms[room] || [])
    })
  })
}

function startWorkers () {
  const workerCount = numCPUs

  for (let i = 0; i < workerCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', function (worker) {
    if (worker.process.exitCode === 0) {
      console.log('Worker died peacefully...', worker.id)
      cluster.fork()
    } else {
      console.log('Worker died with exit code %d, restarting it', worker.id, worker.process.exitCode)
      cluster.fork()
    }
  })
}

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

i18n.configure({
  locales: ['EN', 'VI'],
  directory: './locales'
})

const pretty = function (req, res, next) {
  if (req.response === undefined) {
    res.status(500)
    return res.send(mess500)
  }

  const message = {}
  message.data = req.response
  message.success = get(req.response, 'errMess') ? false : (req.success !== false)
  message.status = get(req.response, 'errMess') ? 500 : req.status || 200
  return res.status(message.status).send(message)
}

const Routers = require('./source/routes')

app.use('/adapters', Routers, pretty)

app.use('/', (req, res) => res.status(404).send('Your requested URL not found'))

// Middleware Services
// For handle return error
app.use((err, req, res, next) => {
  clog('Error message return', req.originalUrl, err)
  // You can check request information in here
  res.status(500)
  res.send(mess500)
})

// Database connection
connectDatabase()

console.log('Starting Load: Coin98 server started at port ' + process.env.PORT)
