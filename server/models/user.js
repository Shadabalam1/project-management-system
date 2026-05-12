import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
    minlength: [6, "Password must be at least 6 characters long"]
  },
  role: {
    type: String,
    enum: {
      values: ["Student", "Teacher", "Admin"],
      message: "Role must be either Student, Teacher, or Admin"
    },
    default: "Student"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  department: {
    type: String,
    trim: true,
    default: "null"
  },
  expertise: {
    type: String,
    default: ""
  },
  maxstudents: {
    type: Number,
    default: 10,
    min: [1, "Max students must be at least 1"]
  },
  assignedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  projects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null
  }
},
{
  timestamps: true 
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
 // next();
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Delete the model if it already exists to avoid overwriting warnings
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model("User", userSchema);

export default User;