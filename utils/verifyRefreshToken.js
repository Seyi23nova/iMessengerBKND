import UserToken from "../models/userToken.js"
import jwt from "jsonwebtoken"

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_KEY


    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken }, (err, doc) => {
            if(!doc) return reject({ error: true, message: "invalid refresh token" })

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if(err) return reject({ error: true, message: "invalid refresh token" })

                resolve({
                    tokenDetails,
                    error: false,
                    message: "valid refresh token"
                })
            })
        })
    })
}


export default verifyRefreshToken