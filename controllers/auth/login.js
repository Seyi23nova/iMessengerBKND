import bcrypt from 'bcryptjs'
import User from '../../models/user.js'
import generateTokens from '../../utils/generateTokens.js'

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ email: email })

        if(!user) return res.status(401).json({ message: "invalid email or password"})

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword) return res.status(401).json({ message: "invalid email or password"})


        //access token and refresh token
        const { accessToken, refreshToken } = await generateTokens(user)

        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "login successful"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}