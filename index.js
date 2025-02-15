import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import authRoutes from './routes/auth.js'
import refreshTokenRoutes from './routes/refreshToken.js'
import userRoutes from './routes/users.js'
import messageRoutes from './routes/message.js'

const app = express();


const upload = multer({ dest: "uploads/" });
app.use(upload.single("photo"));
app.use(cors());

dotenv.config();

app.use('/auth', authRoutes)
app.use('/token', refreshTokenRoutes)
app.use('/', userRoutes)
app.use('/messages', messageRoutes)

//const CONNECTION_URL = process.env.CONNECTION_URL
//const PORT = process.env.PORT || 1337
const CONNECTION_URL = "mongodb+srv://barnabas:Ikigai%40123nova@onegainovadbs.global.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
const PORT = 1337


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
          const server = app.listen(PORT, () => {
              console.log(`server is running on port ${PORT}`)
          })

          return server
     }
)
.catch((error) => console.log(error.message))
