import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const isAuth = async (req , res , next) => {
    try{
        const { token } = req.cookies;
        if(!token) {
            return res.status(401).json({ success: false , message: "Login first" });
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.user =  await User.findById(decoded._id);

        next();
        
    } catch(error){
        res.status(500).json({ status: false , message: error.message });
    }
}