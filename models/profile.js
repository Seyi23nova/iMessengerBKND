import mongoose from 'mongoose'

export const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    interests: { type: String, required: true },
    photo: { type: Buffer, required: false },
    notifications: { type: [ Object ], required: false },
    _id: {
        type: String,
    }
})

//export default mongoose.model("Profile", profileSchema)