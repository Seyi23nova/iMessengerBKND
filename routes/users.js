import express from 'express'
import { getUsers, getUserDetails, getUsers_dashboard } from '../controllers/user/userData.js'
import { addFriendRequest, revokeFriendRequest, acceptFriendRequest, rejectFriendRequest, unfriendRequest } from '../controllers/user/userNetwork.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/users', getUsers)
router.get('/userDetails', auth, getUserDetails)
router.get('/usersDashboard', auth, getUsers_dashboard)
router.post('/addFriend', auth, addFriendRequest)
router.post('/revokeFriend', auth, revokeFriendRequest)
router.post('/acceptFriend', auth, acceptFriendRequest)
router.post('/rejectFriend', auth, rejectFriendRequest)
router.post('/unfriend', auth, unfriendRequest)


export default router