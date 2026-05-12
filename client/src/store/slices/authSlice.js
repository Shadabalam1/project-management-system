import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

// Login thunk
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Store tokens in cookies/localStorage as needed
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    toast.success("Login successful!");
    return response.data.user; // Return user data only
  } catch (error) {
    const message = error.response?.data?.message || "Login failed!";
    toast.error(message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

// Forgot password thunk
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword", 
  async ({ email }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/password/forgot", { email }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Password reset link sent!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send reset link!";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Reset password thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/auth/password/reset/${token}`, 
        { password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Password reset successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password!";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Get user profile thunk
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile", 
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch user profile!";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.get("/auth/logout");
      // Clear tokens from storage  
      localStorage.removeItem('token');
      toast.success("Logged out successfully!");
      return;
    }
    catch (error) {
      const message = error.response?.data?.message || "Failed to logout!";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data);
    } 
  }
);  

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
    isLoading: false,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.authUser = action.payload.user;
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      state.authUser = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    checkAuthStatus: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        // In a real app, you'd verify token validity here
        state.token = token;
        state.isCheckingAuth = false;
      } else {
        state.isCheckingAuth = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
        state.token = action.payload.token || localStorage.getItem('token');
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      
      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isRequestingForToken = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isRequestingForToken = false;
      })
      
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Get user profile cases
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authUser = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.authUser = null;
      })
      
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.token = null;
      });
  },
});

export const { setCredentials, clearCredentials, checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;