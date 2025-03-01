import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

jwt_secret = process.env.JWT_SECRET

const protect = (req, res, next)=>{
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message : "unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded;
        next()
        
    } catch (error) {
        res.status(401).json({
            message : "invalid token"
        })
    }
};

export default protect;
