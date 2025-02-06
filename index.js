import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import authRoutes from './routes/auth.js'
import refreshTokenRoutes from './routes/refreshToken.js'
import userRoutes from './routes/users.js'
import { Server } from "socket.io";



const app = express()

const upload = multer({ dest: "uploads/" });
app.use(upload.single("photo"))
app.use(cors())

dotenv.config()

app.use('/auth', authRoutes)
app.use('/token', refreshTokenRoutes)
app.use('/', userRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 3000


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
          const server = app.listen(PORT, () => {
              console.log(`The server is running on port ${PORT}`)
          })

          const io = new Server(server)

          let socketsConnected = new Set()

          io.on('connection', onConnected)

          function onConnected(socket){
               console.log(socket.id)
               socketsConnected.add(socket.id)

               io.emit('clients-total', socketsConnected.size)

               socket.on('disconnect', () => {
                    console.log("socket disconnected", socket.id)
                    socketsConnected.delete(socket.id)
                    io.emit('clients-total', socketsConnected.size)
               })
          }


          return server
     }
)
.catch((error) => console.log(error.message))