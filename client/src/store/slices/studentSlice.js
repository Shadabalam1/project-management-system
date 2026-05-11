// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../lib/axios";
// import { toast } from "react-toastify";

// const studentSlice = createSlice({
//   name: "student",
//   initialState: {
//     project: null,
//     files: [],
//     supervisors: [],
//     dashboardStats: [],
//     supervisor: null,
//     deadlines: [],
//     feedback: [],
//     status: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {},
// });


// export default studentSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

// Async action
export const submitProposal = createAsyncThunk(
  "student/submitProposal",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/student/submit-proposal",
        data
      );

      toast.success("Proposal submitted successfully");

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    project: null,
    files: [],
    supervisors: [],
    dashboardStats: [],
    supervisor: null,
    deadlines: [],
    feedback: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // future cases yaha add kar sakte ho
  },
});

export default studentSlice.reducer;