import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    _id: {
        type: String,
        default: () => nanoid(),
    }
})

export default mongoose.model("User", userSchema)