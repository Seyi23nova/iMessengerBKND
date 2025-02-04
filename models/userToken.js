import mongoose from 'mongoose'


const userTokenSchema = mongoose.Schema({
    _id: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 30*86400 }
})

export default mongoose.model("UserToken", userTokenSchema)