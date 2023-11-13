import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGY1MTMyNzkwNDgwZmY2YWJlMTA0NCIsImlhdCI6MTY5OTY5Njk0NiwiZXhwIjoxNzAyMjg4OTQ2fQ.R4_15tNOSekWN9Jc3K860urWro0o_MRl765zuUIfQN8",
};


export const fetchFeeds = createAsyncThunk("feeds/fetchFeeds", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/feeds/all`);

  return response.data;
});

export const createFeed = createAsyncThunk("feeds/createFeed", async (data) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds`, data, { headers });

  return response.data;
});

export const deleteFeed = createAsyncThunk("feeds/deleteFeed", async (id) => {
  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/${id}`, { headers });

  return id;
});

export const editFeed = createAsyncThunk("feeds/editFeed", async (id, data) => {
  const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/${id}`, data, { headers });

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
        editFeed.pending,
        (state) => {
          state.loading = true;
          state.error = null;
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
          state.feedData = state.feedData.filter(
            (e) => e._id !== id
          );
        })
      .addCase(editFeed.fulfilled,
        (state, action) => {
          state.loading = false;
          state.feedData = action.payload;
        })
      .addCase(
        fetchFeeds.rejected,
        createFeed.rejected,
        deleteFeed.rejected,
        editFeed.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  },
});

export default feedSlice.reducer;