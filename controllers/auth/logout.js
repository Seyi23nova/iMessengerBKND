import UserToken from "../../models/userToken.js"

export const logout = async (req, res) => {

    const refreshToken = req.header("x-refresh-token")

    try {

        const userToken = await UserToken.findOne({ token: refreshToken })

        if(!userToken) return res.status(200).json({error: false, message: "logged out successfully"})

        await userToken.deleteOne()

        res.status(200).json({error: false, message: "logged out successfully"})

    } catch (error) {
        console.log(error)

        res.status(500).json({ error: true, message: "internal server error" })
    }
}