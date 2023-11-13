import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGY0ZTQwYTEyYjk3MDFiM2ZjZTQxNyIsImlhdCI6MTY5OTY5NjE5MiwiZXhwIjoxNzAyMjg4MTkyfQ.YqaXN6VkMxkrnj8KZmU2A8PkeOlJ5yAcEaNbzJXaaqQ",
};

// Async Thunks
export const fetchAnnouncements = createAsyncThunk(
  "about/fetchAnnouncements",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/announcements/all`
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
      .addCase(
        createAnnouncement.pending,
        fetchAnnouncements.pending,
        deleteAnnouncement.pending,
        updateAnnouncement.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcementData = action.payload;
      })
      .addCase(
        createAnnouncement.rejected,
        fetchAnnouncements.rejected,
        deleteAnnouncement.rejected,
        updateAnnouncement.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.announcementData.push(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        const updateAnnouncement = action.payload;
        const index = state.announcementData.findIndex(
          (e) => e._id === updateAnnouncement.updatedAnnouncement._id
        );
        if (index !== -1) {
          state.announcementData[index] =
            updateAnnouncement.updatedAnnouncement;
        }
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        const id = action.payload;
        state.announcementData = state.announcementData.filter(
          (e) => e._id !== id
        );
      });
  },
});

export default announcementSlice.reducer;
