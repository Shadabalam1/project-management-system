import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/user.js";
import * as userService from "../services/userServices.js";

export const createStudent = asyncHandler(async (req, res, next) => {
    const { name, email, password, department } = req.body;

    // Validation - throw error instead of manual response
    if (!name || !email || !password || !department) {
        throw new Error("Please provide all required fields");
    }   

    const user = await userService.createUser({
        name,  
        email,
        password,
        department,
        role: "Student"
    });

    res.status(201).json({ success: true, data: user });
});

export const updateStudent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // Prevent role updates through this route  
    delete updateData.role;

    const user = await userService.updateUser(id, updateData);

    res.status(200).json({ success: true, data: user });
});

export const deleteStudent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const user = await userService.getUserById(id);

    if (user.role !== "Student") {
        throw new Error("User is not a student");
    }

    await userService.deleteUser(id);

    res.status(200).json({ 
        success: true, 
        message: "Student deleted successfully" 
    });
});





export const createTeacher = asyncHandler(async (req, res, next) => {
    const { name, email, password, department, maxstudents, expertise } = req.body;

    // Validation - throw error instead of manual response
    if (!name || !email || !password || !department || !maxstudents || !expertise) {
        throw new Error("Please provide all required fields");
    }   

    const user = await userService.createUser({
        name,  
        email,
        password,
        department,
        role: "Teacher",
        maxstudents,
        expertise: Array.isArray(expertise) ? expertise : typeof expertise === "string" ? expertise.split(",").map(e => e.trim()) : []
    });

    res.status(201).json({ success: true, data: user });
});



export const updateTeacher = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // Prevent role updates through this route  
    delete updateData.role;

    const user = await userService.updateUser(id, updateData);

    res.status(200).json({ success: true, data: user });
});

export const deleteTeacher = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const user = await userService.getUserById(id);

    if (user.role !== "Teacher") {
        throw new Error("User is not a teacher");
    }

    await userService.deleteUser(id);

    res.status(200).json({ 
        success: true, 
        message: "Teacher deleted successfully" 
    });
});



export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
});

export const getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ success: true, data: user });
});


