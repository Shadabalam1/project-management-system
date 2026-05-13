import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const createStudent = createAsyncThunk(
  "createStudent",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/admin/create-student", data);
      toast.success("Student created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create student");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const updateStudent = createAsyncThunk(
  "updateStudent",
  async ({id,data}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/admin/update-student/${id}`, data);
      toast.success("Student updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update student");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/admin/delete-student/${id}`);
      toast.success("Student deleted successfully");
      return response.id;
    } catch (error) {
      toast.error("Failed to delete student");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);





export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (id_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/admin/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);






const adminSlice = createSlice({
  name: "admin",
  initialState: {
    students: [],
    teachers: [],
    projects: [],
    users: [],
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false; 
        state.students.push(action.payload); 
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload; 
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(student => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;  
        state.students = state.students.filter(student => student._id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false; 
        state.users = action.payload; 
      })
      .addCase(getAllUsers.rejected, (state, action) => {

         state.loading = false; 
        state.error = action.payload;

      }
       
      )
  
  },
});

export default adminSlice.reducer;
