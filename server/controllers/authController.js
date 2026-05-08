import { asyncHandler } from "../middlewares/asyncHandler.js";
import errorHandler from "../middlewares/error.js";
import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password , role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
        role
    });
await user.save();
    generateToken(user, 201, "User registered successfully", res);
});


export const login = asyncHandler(async (req, res) => {

const { email, password , role} = req.body;

// Validate input
if (!email || !password || !role) {
    return res.status(400).json({ message: "Please provide all required fields" });
}

const user = await User.findOne({ email, role }).select("+password");


if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
}

const ispasswordMatch = await user.comparePassword(password);

if (!ispasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
}

generateToken(user, 200, "Login successful", res);

});



export const logout = asyncHandler(async (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "Logged out successfully",
    });
});


export const getUser= asyncHandler(async (req, res) => {

   const user = req.user;
   res.status(200).json({    
    success: true,
    user
   }); 

});



export const forgotPassword = asyncHandler(async (req, res) => {});
export const resetPassword = asyncHandler(async (req, res) => {});

