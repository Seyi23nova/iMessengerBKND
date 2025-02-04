import mongoose from 'mongoose'
import Network from "../../models/network.js"

import { profileSchema } from "../../models/profile.js"
const Profile = mongoose.model("Profile", profileSchema)



//fetch all registered users
export const getUsers = async (req, res) => {
    try {
        const allUsers = await Profile.find({ })

        res.status(200).json({ allUsers })

    } catch(error) {
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }

}




//fetch all registered users for display on user dashboard - AUTHENTICATED
export const getUsers_dashboard = async (req, res) => {
    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id


    try {
        const allUsers = await Profile.find({ })
        const userNetwork = await Network.findOne({ _id: userID })
        const userProfile = await Profile.findOne({ _id: userID })

        const users_dashboard = allUsers.filter((profile) => {
            return  profile._id !== userProfile._id && !(userNetwork.friendsIDs.includes(profile._id)) 
                    && !(userNetwork.sentFriendRequestsIDs.includes(profile._id))
                            && !(userNetwork.receivedFriendRequestsIDs.includes(profile._id))
        })

        res.status(200).json({ users_dashboard })

    } catch(error){
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }
}




//fetch details of a single user - AUTHENTICATED
export const getUserDetails = async (req, res) => {
    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    const details = {
        name: null,
        photo: null,
        notifications: null,
        friends: null,
        sentFriendRequests: null,
        receivedFriendRequests: null,
    }

    try {
        const userProfile = await Profile.findOne({ _id: userID })
        const userNetwork = await Network.findOne({ _id: userID})

        details.name = userProfile.name
        details.photo = userProfile.photo
        details.notifications = userProfile.notifications
        details.friends = userNetwork.friends
        details.sentFriendRequests = userNetwork.sentFriendRequests
        details.receivedFriendRequests = userNetwork.receivedFriendRequests

        res.status(200).json({ details })

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }
}