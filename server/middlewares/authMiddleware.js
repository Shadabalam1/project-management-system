import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/user.js";
import errorHandler from "./error.js";


export const isAuthenticated = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies; 

if (!token) {
    return res.status(401).json({ message: "Please login to access this resource" });
}

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = await User.findById(decoded.id).select("-resetPasswordToken -resetPasswordExpire");

if (!req.user) {
    return res.status(401).json({ message: "User not found" }); 
}

next();
    
});