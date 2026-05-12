import express from "express";
import {
  createStudent,
  updateStudent,
  deleteStudent,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllUsers
} from "../controllers/adminController.js";
import multer from "multer";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";


const router = express.Router();

router.post(
    "/create-student",
     isAuthenticated, 
     isAuthorized("admin"), 
     createStudent
    );

    router.put(
    "/update-student/:id",
     isAuthenticated, 
     isAuthorized("admin"), 
     updateStudent
    );

    router.delete(
    "/delete-student/:id",
     isAuthenticated, 
     isAuthorized("admin"), 
     deleteStudent
    );

    router.post(
    "/create-teacher",
     isAuthenticated, 
     isAuthorized("admin"), 
     createTeacher
    );

    router.put(
    "/update-teacher/:id",
     isAuthenticated, 
     isAuthorized("admin"), 
     updateTeacher
    );

    router.delete(
    "/delete-teacher/:id",
     isAuthenticated, 
     isAuthorized("admin"), 
     deleteTeacher
    );

    
    router.post(
    "/users",
     isAuthenticated, 
     isAuthorized("admin"), 
     getAllUsers
    );

export default router;