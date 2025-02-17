import mongoose from 'mongoose'
import Message from '../../models/message.js'


//fetch all messages between any two users
export const getMessages = async (req, res) => {
    try {
        const userTokenDetails = req.userTokenDetails

        const userID = userTokenDetails._id    //ID of current logged in user
        const friendID = req.header("friend-id")  //ID of friend

        //fetch all messages with user's and friend's IDs
        const sentByUser = await Message.find({sender: userID, receiver: friendID })
        const sentByFriend = await Message.find({sender: friendID, receiver: userID })

        const allMessages = [...sentByUser, ...sentByFriend]

        //sort messages by timestamp
        allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


        res.status(200).json({ allMessages })

    } catch(error) {
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }

}


//send a message
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const userTokenDetails = req.userTokenDetails

        const userID = userTokenDetails._id    //ID of current logged in user
        const friendID = req.header("friend-id")  //ID of friend

        const messageEntry = await Message.create({
            content: message,
            sender: userID,
            receiver: friendID,
            timestamp: new Date().toISOString()
        })


        res.status(200).json({ message: "message sent successfully"})

    } catch(error) {
        console.log(error)

        res.status(500).json({ message: "internal server error"})
    }

}
