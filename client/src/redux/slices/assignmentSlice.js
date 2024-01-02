import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  isPendingOrRejectedAction,
  handlePendingAndRejected,
} from "../../utils/actionHandler";

const headers = {
  authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0MTc4M2FjMTdhYzM0NzIwZjI4NCIsImlhdCI6MTcwMzE2NjUyMCwiZXhwIjoxNzA1NzU4NTIwfQ.dkDckQKAgVB93AXmSJNgYtrpIPZ8j3Lis33APxsx39c`,
};

const struct = (arr) => {
  const data = arr.map(
    ({ _id, name, description,submitted,createdAt }) => {
      const obj = {
        _id,
        name,
        description,
        submitted,
        createdAt 
      };
      return obj;
    }
  );

  return data;
};


export const fetchSingleAssignment = createAsyncThunk("about/fetchSingleAssignment", async ({ id }) => {
  const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/assignments/submissions/${id}`, { headers });
  return response.data.assignment;
});

export const fetchAllAssignments = createAsyncThunk("about/fetchAllAssignments", async ({ id }) => {
  const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/assignments/${id}`, { headers });
  return response.data.assignments;
});


export const verifyAssignment = createAsyncThunk("about/verifyAssignment", async ({id,projectURL}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/assignments/verify/${id}`,
    {projectURL : projectURL},
    { headers }
  );

  return response.data;
});


export const createAssignment = createAsyncThunk("about/createAssignment", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/assignments`,
    data,
    { headers }
  );
  return response.data;
});

export const deleteAssignment = createAsyncThunk("about/deleteAssignment", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/assignments/${id}`,
    { headers }
  );
  return id;
});


export const updateAssignment = createAsyncThunk(
  "about/updateAssignment",
  async ({ id, updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/assignments/${id}`,
      updatedData,
      { headers }
    );
    return response.data;
  }
);

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: {
    assignmentData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentData = struct(action.payload);
      })
      .addCase(fetchSingleAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentData = struct([action.payload]);
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentData?.concat(struct([action.payload.newAssignment]));
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.assignmentData = state.assignmentData.filter((e) => e._id !== id);
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const updateAssignment = struct([action.payload]);
        const index = state.assignmentData.findIndex(
          (e) => e._id === updateAssignment[0]._id
        );
        if (index !== -1) {
          state.assignmentData[index] = updateAssignment[0];
        }
      })
      .addCase(verifyAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const updateAssignment = struct([action.payload.assignment]);
        const index = state.assignmentData.findIndex(
          (e) => e._id === updateAssignment[0]._id
        );
        if (index !== -1) {
          state.assignmentData[index] = updateAssignment[0];
        }
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default assignmentSlice.reducer;