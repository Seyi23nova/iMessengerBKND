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
              console.log(`server running on port ${PORT}`)
          })

          return server
     }
)
.catch((error) => console.log(error.message))
