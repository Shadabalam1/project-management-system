import User from "../models/user.js";

export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        // Pass the original error to preserve specific validation messages
        throw error;
    }   
};

export const updateUser = async (id, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true 
        }).select("-password");
        
        if (!user) {
            throw new Error("User not found");
        }
        
        return user;
    } catch (error) {
        // Pass the original error or throw not found
        throw error;
    }   
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id)
            .select("-password -resetPasswordToken -resetPasswordExpire"); 
        
        if (!user) {
            throw new Error("User not found");
        }
        
        return user;
    } catch (error) {
        // Pass the original error or throw not found
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            throw new Error("User not found");
        }
        
        return user;
    } catch (error) {
        // Pass the original error or throw not found
        throw error;
    }
};


export const getAllUsers = async () => {

    const query = {role: {$ne: "Admin"}}; // Exclude Admins from the results    

    const users = await User.find(query)
    .select("-password -resetPasswordToken -resetPasswordExpire")
    .sort({ createdAt: -1 }); // Sort by creation date, newest first
    
    return users;
}