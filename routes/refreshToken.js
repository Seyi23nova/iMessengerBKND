import express from 'express'
import { getAccessToken } from '../controllers/auth/getAccessToken.js'
import { logout } from '../controllers/auth/logout.js'


const router = express.Router()

router.post('/', getAccessToken)
router.delete('/', logout)

export default router