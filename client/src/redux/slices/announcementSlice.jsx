import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  isPendingOrRejectedAction,
  handlePendingAndRejected,
} from "../../utils/actionHandler";
const storedToken = JSON.parse(localStorage.getItem("token"));

const headers = {
  // authorization: `Bearer ${storedToken}`,
  authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0MTc4M2FjMTdhYzM0NzIwZjI4NCIsImlhdCI6MTcwMzE2NjUyMCwiZXhwIjoxNzA1NzU4NTIwfQ.dkDckQKAgVB93AXmSJNgYtrpIPZ8j3Lis33APxsx39c`,
};

// Async Thunks
export const fetchAnnouncements = createAsyncThunk(
  "about/fetchAnnouncements",
  async (query) => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements/all`,
      {
        params: {
          tag: query,
        },
      }
    );
    return response.data;
  }
);

export const createAnnouncement = createAsyncThunk(
  "about/createAnnouncement",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements`,
      data,
      { headers }
    );
    return response.data;
  }
);

export const updateAnnouncement = createAsyncThunk(
  "about/updateAnnouncement",
  async ({ id, updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements/${id}`,
      updatedData,
      { headers }
    );
    console.log(response);
    return response.data;
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "about/deleteAnnouncement",
  async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements/${id}`,
      { headers }
    );
    return id;
  }
);

// Slice
const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    announcementData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementData = action.payload;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementData?.push(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const updateAnnouncement = action.payload;
        console.log("This is updated announcmenr", updateAnnouncement);
        state.announcementData = state.announcementData.map((e) =>
          e._id === updateAnnouncement.updatedAnnouncement._id
            ? updateAnnouncement.updatedAnnouncement
            : e
        );
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.announcementData = state.announcementData.filter(
          (e) => e._id !== id
        );
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default announcementSlice.reducer;
