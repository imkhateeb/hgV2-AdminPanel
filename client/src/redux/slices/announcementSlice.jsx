import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchAnnouncements = createAsyncThunk("about/fetchAnnouncements", async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements/all`)
     return response.data
});

// export const createAnnouncement = createAsyncThunk("about/createAnnouncement", async (wingData) => {
//   const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements`, wingData);
//   return response.data;
// });

// export const updateWing = createAsyncThunk("about/updateWing", async ({ id, updatedData }) => {
//   const response = await axios.put(`${process.env.REACT_APP_BACKEND_URI}/api/wings/${id}`, updatedData);
//   return response.data;
// });

// export const deleteWing = createAsyncThunk("about/deleteWing", async (wingId) => {
//   await axios.delete(`${process.env.REACT_APP_BACKEND_URI}/api/wings/${wingId}`);
//   return wingId;
// });

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
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementData = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //   .addCase(createWing.fulfilled, (state, action) => {
    //     state.wingsData.push(action.payload);
    //   })
    //   .addCase(updateWing.fulfilled, (state, action) => {
    //     const updatedWing = action.payload;
    //     const index = state.wingsData.findIndex((wing) => wing.id === updatedWing.id);
    //     if (index !== -1) {
    //       state.wingsData[index] = updatedWing;
    //     }
    //   })
    //   .addCase(deleteWing.fulfilled, (state, action) => {
    //     const deletedWingId = action.payload;
    //     state.wingsData = state.wingsData.filter((wing) => wing.id !== deletedWingId);
    //   });
  },
});

export default announcementSlice.reducer;
