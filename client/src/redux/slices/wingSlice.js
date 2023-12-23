import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  isPendingOrRejectedAction,
  handlePendingAndRejected,
} from "../../utils/actionHandler";
// const storedToken = JSON.parse(localStorage.getItem("token"));

const headers = {
  // authorization: `Bearer ${storedToken}`,
  authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0MTc4M2FjMTdhYzM0NzIwZjI4NCIsImlhdCI6MTcwMzE2NjUyMCwiZXhwIjoxNzA1NzU4NTIwfQ.dkDckQKAgVB93AXmSJNgYtrpIPZ8j3Lis33APxsx39c`,
};

const struct = (arr) => {
  const data = arr.map(
    ({ _id, name, description, lead, levels, coordinators, image }) => {
      const obj = {
        _id,
        name,
        description,
        lead,
        levels,
        coordinators,
        image,
      };
      return obj;
    }
  );

  return data;
};

export const fetchWings = createAsyncThunk("about/fetchWings", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings`
  );
  return response.data;
});

export const createWing = createAsyncThunk("about/createWing", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings`,
    data,
    { headers }
  );
  return response.data;
});

export const deleteWing = createAsyncThunk("about/deleteWing", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings/${id}`,
    { headers }
  );
  return id;
});

export const updateWing = createAsyncThunk(
  "about/updateWing",
  async ({ id, updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings/${id}`,
      updatedData,
      { headers }
    );
    return response.data;
  }
);

export const fetchWing = createAsyncThunk("about/getWing", async ({ id }) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings/${id}`
  );
  return response.data;
});

export const getWingLevels = createAsyncThunk(
  "about/getWingLevels",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings/levels/${id}`
    );
    return response.data;
  }
);
// Slice for wings
const wingslice = createSlice({
  name: "wings",
  initialState: {
    wingData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWings.fulfilled, (state, action) => {
        state.loading = false;
        state.wingData = struct(action.payload);
      })
      .addCase(createWing.fulfilled, (state, action) => {
        state.loading = false;
        state.wingData?.concat(struct([action.payload]));
      })
      .addCase(deleteWing.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.wingData = state.wingData.filter((e) => e._id !== id);
      })
      .addCase(updateWing.fulfilled, (state, action) => {
        state.loading = false;
        const updateWing = struct([action.payload]);
        const index = state.wingData.findIndex(
          (e) => e._id === updateWing[0]._id
        );
        if (index !== -1) {
          state.wingData[index] = updateWing[0];
        }
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default wingslice.reducer;
