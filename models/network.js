import mongoose from 'mongoose'
import { profileSchema } from './profile.js'

const networkSchema = mongoose.Schema({
    friends: { type: [ profileSchema ], required: false },
    sentFriendRequests: { type: [ profileSchema ], required: false },
    receivedFriendRequests: { type: [ profileSchema ], required: false },
    friendsIDs: { type: [ String ], required: false },
    sentFriendRequestsIDs: { type: [ String ], required: false },
    receivedFriendRequestsIDs: { type: [ String ], required: false },
    _id: {
        type: String,
    }
})

export default mongoose.model("Network", networkSchema)