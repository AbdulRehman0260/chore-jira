import jwt from "jsonwebtoken"

/* This function is to be run on routes which come after logging in. It attempts to take the generated JWT token 
that is created after logging in and verify if this user has the correct secret key. If it passes, it sends control over to
the next controller.
*/
export const loginMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        res.clearCookie("token")
        return res.status(500).json({ error: "Internal Server Error" })
    }
}