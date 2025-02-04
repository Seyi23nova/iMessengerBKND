import verifyRefreshToken from "../../utils/verifyRefreshToken.js"

export const getAccessToken = async (req, res) => {

    const refreshToken = req.header('refresh-token')

    verifyRefreshToken(refreshToken)
    .then(({ tokenDetails }) => {
        const payload = { _id: tokenDetails._id }

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresin: "15m" }
        )

        res.status(200).json({
            error: false,
            accessToken,
            message: "access token created successfully"
        })
    })
    .catch((error) => res.status(400).json(error))
}