import { asyncHandler } from "../middlewares/asyncHandler.js";
import errorHandler from "../middlewares/error.js";
import  User  from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";

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


export const getUser= asyncHandler(async (req, res, next) => {

   const user = req.user;
   res.status(200).json({    
    success: true,
    user,
   }); 

});



export const forgotPassword = asyncHandler(async (req, res) => {

const user = await User.findOne({ email: req.body.email });

if (!user) {
    return res.status(404).json({ message: "User not found" });
}


const resetToken = user.getResetPasswordToken();

await user.save({ validateBeforeSave: false });


const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

try {
    await sendEmail({
        email: user.email,
        subject: "TaskFlow Password Recovery",
        message,
    })
    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
    });
}
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({ message: "Email could not be sent" });    
    }


});






export const resetPassword = asyncHandler(async (req, res, next) => {

const { token } = req.params;
const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");


const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
});
if (!user) {
    return res.status(400).json({ message: "Invalid or expired password reset token" });
}

if(!req.body.password || !req.body.confirmPassword){ {
    return res.status(400).json({ message: "Please provide a new password and confirmation" });
}}

if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
}

user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();

generateToken(user, 200, "Password reset successful", res);



});
