import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../../models/user.js'
import Network from '../../models/network.js'

import { profileSchema } from '../../models/profile.js'
const Profile = mongoose.model("Profile", profileSchema)


export const signup = async (req, res) => {
    const { email, interests, location, name, password, photo } = req.body

    try {
        const existingUser = await User.findOne({ email: email })

        if(existingUser) return res.status(400).json({ message: "user already exists" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({ 
            email: email,
            password: hashedPassword
        })

        const profile = await Profile.create({
            name: name,
            location: location,
            interests: interests,
            photo: photo,
            _id: user._id
        })

        const network = await Network.create({
            _id: user._id
        })

        res.status(200).json({ user })

    } catch(error){
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}