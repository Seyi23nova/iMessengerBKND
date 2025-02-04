import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    content: { type: String, required: false },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
    timestamp: { type: Date, required: false }
})

export default mongoose.model("Message", messageSchema)