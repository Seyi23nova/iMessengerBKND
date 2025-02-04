import mongoose from 'mongoose'
import Network from '../../models/network.js'

import { profileSchema } from "../../models/profile.js"
const Profile = mongoose.model("Profile", profileSchema)



//add friend request - AUTHENTICATED
export const addFriendRequest = async (req, res) => {

    const potentialFriendID = req.header("potential-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {

        const loggedInUserProfile = await Profile.findOne({ _id: userID })
        const loggedInUserNetwork = await Network.findOne({ _id: userID })


        const potentialFriendProfile = await Profile.findOne({ _id: potentialFriendID })
        const potentialFriendNetwork = await Network.findOne({ _id: potentialFriendID })

        if(loggedInUserProfile && potentialFriendProfile){

            loggedInUserNetwork.sentFriendRequests.push(potentialFriendProfile)
            loggedInUserNetwork.sentFriendRequestsIDs.push(potentialFriendProfile._id)
            await loggedInUserNetwork.save()


            potentialFriendNetwork.receivedFriendRequests.push(loggedInUserProfile)
            potentialFriendNetwork.receivedFriendRequestsIDs.push(loggedInUserProfile._id)
            await potentialFriendNetwork.save()



            //send notification to potential friend
            potentialFriendProfile.notifications.unshift({
                message: `new friend request from ${ loggedInUserProfile.name }`,
                timestamp: new Date().toDateString(),
                id: `${ loggedInUserProfile.name }-friendrequest`    //format:  orchestrator-action
            })

            await potentialFriendProfile.save()


            return res.status(200).json({ message: "request sent" })
        }


        res.status(404).json({ message: "could not send request" })

    } catch(error){
        console.log(error)

        res.status(500).json({ message: "internal server error" })
    }

}




// revoke friend request - AUTHENTICATED
export const revokeFriendRequest = async (req, res) => {
    const revokeFriendID = req.header("revoke-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {
        const loggedInUserNetwork = await Network.findOne({ _id: userID })
        const loggedInUserProfile = await Profile.findOne({ _id: userID })
        const revokeFriendNetwork = await Network.findOne({ _id: revokeFriendID })
        const revokedFriendProfile = await Profile.findOne({ _id: revokeFriendID })

        if(loggedInUserNetwork && revokeFriendNetwork){

            loggedInUserNetwork.sentFriendRequests = loggedInUserNetwork.sentFriendRequests.filter((profile) => {
                return profile._id !== revokeFriendID
            })
            loggedInUserNetwork.sentFriendRequestsIDs = loggedInUserNetwork.sentFriendRequestsIDs.filter((id) => {
                return id !== revokeFriendID
            })
            await loggedInUserNetwork.save()


            revokeFriendNetwork.receivedFriendRequests = revokeFriendNetwork.receivedFriendRequests.filter((profile) => {
                return profile._id !== userID
            })
            revokeFriendNetwork.receivedFriendRequestsIDs = revokeFriendNetwork.receivedFriendRequestsIDs.filter((id) => {
                return id !== userID
            })
            await revokeFriendNetwork.save()


            //remove notification from revoked friend
            revokedFriendProfile.notifications = revokedFriendProfile.notifications.filter((notification) => {
                return notification.id != `${ loggedInUserProfile.name }-friendrequest`

            })

            await revokedFriendProfile.save()
    
            return res.status(200).json({ message: "revoked" })
        }

        res.status(404).json({ message: "could not complete action" })

    } catch (error){
        console.log(error)

        res.status(500).json({ message: "internal server error" })
    }

}



//accept friend request - AUTHENTICATED
export const acceptFriendRequest = async (req, res) => {
    const acceptFriendID = req.header("accept-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {
        const loggedInUserNetwork = await Network.findOne({ _id: userID })
        const loggedInUserProfile = await Profile.findOne({ _id: userID })
        const acceptFriendNetwork = await Network.findOne({ _id: acceptFriendID })
        const acceptFriendProfile = await Profile.findOne({ _id: acceptFriendID })



        if(loggedInUserNetwork && acceptFriendNetwork){

            loggedInUserNetwork.friends.push(acceptFriendProfile)
            loggedInUserNetwork.friendsIDs.push(acceptFriendProfile._id)

            loggedInUserNetwork.receivedFriendRequests = loggedInUserNetwork.receivedFriendRequests.filter((profile) => {
                return profile._id !== acceptFriendID
            })
            loggedInUserNetwork.receivedFriendRequestsIDs = loggedInUserNetwork.receivedFriendRequestsIDs.filter((id) => {
                return id !== acceptFriendID
            })

            await loggedInUserNetwork.save()


            acceptFriendNetwork.friends.push(loggedInUserProfile)
            acceptFriendNetwork.friendsIDs.push(loggedInUserProfile._id)

            acceptFriendNetwork.sentFriendRequests = acceptFriendNetwork.sentFriendRequests.filter((profile) => {
                return profile._id !== userID
            })
            acceptFriendNetwork.sentFriendRequestsIDs = acceptFriendNetwork.sentFriendRequestsIDs.filter((id) => {
                return id !== userID
            })

            await acceptFriendNetwork.save()            

            //remove notification from loggedInUser
            loggedInUserProfile.notifications = loggedInUserProfile.notifications.filter((notification) => {
                return notification.id != `${ acceptFriendProfile.name }-friendrequest`

            })
            await loggedInUserProfile.save()


            //send acceptance notification to acceptFriend
            acceptFriendProfile.notifications.unshift({
                message: `${ loggedInUserProfile.name } has accepted your friend request🎉`,
                timestamp: new Date().toDateString(),
                id: `${ loggedInUserProfile.name }-requestacceptance`    //format:  orchestrator-action
            })

            await acceptFriendProfile.save()

            return res.status(200).json({ message: "request accepted" })
        }


        res.status(404).json({ message: "could not accept request" })

    } catch(error){
        console.log(error)

        res.status(500).json({ message: "internal server error" })
    }
}



//reject friend request - AUTHENTICATED
export const rejectFriendRequest = async (req, res) => {
    const rejectFriendID = req.header("reject-friend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id

    try {

        const loggedInUserNetwork = await Network.findOne({ _id: userID })
        const loggedInUserProfile = await Profile.findOne({ _id: userID })
        const rejectFriendNetwork = await Network.findOne({ _id: rejectFriendID })
        const rejectFriendProfile = await Profile.findOne({ _id: rejectFriendID })

        if(loggedInUserNetwork && rejectFriendNetwork){

            loggedInUserNetwork.receivedFriendRequests = loggedInUserNetwork.receivedFriendRequests.filter((profile) => {
                return profile._id !== rejectFriendID
            })
            loggedInUserNetwork.receivedFriendRequestsIDs = loggedInUserNetwork.receivedFriendRequestsIDs.filter((id) => {
                return id !== rejectFriendID
            })

            await loggedInUserNetwork.save()

            
            rejectFriendNetwork.sentFriendRequests = rejectFriendNetwork.sentFriendRequests.filter((profile) => {
                return profile._id !== userID
            })
            rejectFriendNetwork.sentFriendRequestsIDs = rejectFriendNetwork.sentFriendRequestsIDs.filter((id) => {
                return id !== userID
            })

            await rejectFriendNetwork.save()      

            //remove notification from loggedInUser
            loggedInUserProfile.notifications = loggedInUserProfile.notifications.filter((notification) => {
                return notification.id != `${ rejectFriendProfile.name }-friendrequest`

            })
            await loggedInUserProfile.save()


            //send rejection notification to rejectFriend
            rejectFriendProfile.notifications.unshift({
                message: `${ loggedInUserProfile.name } rejected your friend request`,
                timestamp: new Date().toDateString(),
                id: `${ loggedInUserProfile.name }-requestrejection`    //format:  orchestrator-action
            })

            await rejectFriendProfile.save()


            return res.status(200).json({ message: "request rejected" })
        }

        res.status(404).json({ message: "could not reject request" })


    } catch(error){
        console.log(error)

        res.status(500).json({ message: "internal server error" })

    }
}



// remove friend from network - AUTHENTICATED
export const unfriendRequest = async (req, res) => {
    const unfriendID = req.header("unfriend-id")

    const userTokenDetails = req.userTokenDetails

    const userID = userTokenDetails._id


    try {
        const loggedInUserNetwork = await Network.findOne({ _id: userID })
        const loggedInUserProfile = await Profile.findOne({ _id: userID })
        const unfriendNetwork = await Network.findOne({ _id: unfriendID })
        const unfriendProfile = await Profile.findOne({ _id: unfriendID })
        

        if(loggedInUserNetwork && unfriendNetwork){

            loggedInUserNetwork.friends = loggedInUserNetwork.friends.filter((profile) => {
                return profile._id !== unfriendID
            })
            loggedInUserNetwork.friendsIDs = loggedInUserNetwork.friendsIDs.filter((id) => {
                return id !== unfriendID
            })

            await loggedInUserNetwork.save()

            unfriendNetwork.friends = unfriendNetwork.friends.filter((profile) => {
                return profile._id !== userID
            })
            unfriendNetwork.friendsIDs = unfriendNetwork.friendsIDs.filter((id) => {
                return id !== userID
            })

            await unfriendNetwork.save()            

            //send rejection notification to unfriend
            unfriendProfile.notifications.unshift({
                message: `${ loggedInUserProfile.name } unfriended you`,
                timestamp: new Date().toDateString(),
                id: `${ loggedInUserProfile.name }-unfriend`    //format:  orchestrator-action
            })

            await unfriendProfile.save()

            return res.status(200).json({ message: "friend removed" })
        }


        res.status(404).json({ message: "could not remove friend" })

    } catch(error) {
        console.log(error)

        res.status(500).json({ message: "internal server error" })
    }
}