import jwt from "jsonwebtoken"
import UserToken from "../models/userToken.js"

const generateTokens = async (user) => {
    try {
        const payload = {
            _id: user._id
        }

        const accessToken = jwt.sign(
            payload,
            //process.env.ACCESS_TOKEN_PRIVATE_KEY,
            "ACCESS TOKEN SECRET KEY",
            { expiresIn: "30m" }
        )

        const refreshToken = jwt.sign(
            payload,
            //process.env.REFRESH_TOKEN_PRIVATE_KEY,
            "REFRESH TOKEN SECRET KEY",
            { expiresIn: "30d" }
        )

        const userToken = await UserToken.findOne({ _id: user._id })

        if (userToken) await userToken.deleteOne()  //refresh token invalidation

        await new UserToken({ _id: user._id, token: refreshToken }).save()

        return Promise.resolve({ accessToken, refreshToken })

    } catch(error){
        return Promise.reject(error)

    }
}

export default generateTokens