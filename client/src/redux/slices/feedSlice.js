import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGY1MTMyNzkwNDgwZmY2YWJlMTA0NCIsImlhdCI6MTY5OTY5Njk0NiwiZXhwIjoxNzAyMjg4OTQ2fQ.R4_15tNOSekWN9Jc3K860urWro0o_MRl765zuUIfQN8",
};


export const fetchFeeds = createAsyncThunk("about/fetchFeeds", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/all`);

  return response.data;
});

export const createFeed = createAsyncThunk("about/createFeed", async (data) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds`, data, { headers });

  return response.data;
});

export const deleteFeed = createAsyncThunk("about/deleteFeed", async (id) => {
  await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/${id}`, { headers });

  return id;
});

export const updateFeed = createAsyncThunk("about/updateFeed", async ({ id, data }) => {
  const response = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/${id}`, data, { headers });

  return response.data;
});

// Slice for feeds
const feedSlice = createSlice({
  name: "feeds",
  initialState: {
    feedData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFeeds.pending,
        createFeed.pending,
        deleteFeed.pending,
        updateFeed.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(
        fetchFeeds.rejected,
        createFeed.rejected,
        deleteFeed.rejected,
        updateFeed.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
      .addCase(fetchFeeds.fulfilled,
        (state, action) => {
          state.loading = false;
          state.feedData = action.payload;
        })
      .addCase(createFeed.fulfilled,
        (state, action) => {
          state.loading = false;
          state.feedData = action.payload;
        })
      .addCase(deleteFeed.fulfilled,
        (state, action) => {
          state.loading = false;
          const id = action.payload;
          state.feedData.feeds = state.feedData.feeds.filter(
            (e) => e._id !== id
          );
        })
      .addCase(updateFeed.fulfilled, (state, action) => {
        const updateFeed = action.payload;
        const index = state.announcementData.findIndex(
          (e) => e._id === updateFeed.updatedFeed._id
        );
        if (index !== -1) {
          state.updatedFeed[index] =
          updateFeed.updatedFeed;
        }
      })
  },
});

export default feedSlice.reducer;