import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    const token = req.header("x-access-token")

    if (!token) return res.status(408).json({ error: true, message: "access denied: no token provided" })

    try {
        const tokenDetails = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_PRIVATE_KEY
        )

        if (!tokenDetails) return res.status(405).json({ error: true, message: "access denied: bad token" })

        req.userTokenDetails = tokenDetails    //decoded token
        next()

    } catch(error){
        res.status(403).json({ error: true, message: "access denied: invalid token" })
    }
}


export default auth