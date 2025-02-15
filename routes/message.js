import express from 'express'
import { getMessages, sendMessage } from '../controllers/message/message.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/', auth, getMessages)
router.post('/sendMessage', auth, sendMessage)



export default router