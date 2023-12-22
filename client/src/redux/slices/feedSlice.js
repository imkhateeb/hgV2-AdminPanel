import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  isPendingOrRejectedAction,
  handlePendingAndRejected,
} from "../../utils/actionHandler";
const storedToken = JSON.parse(localStorage.getItem("token"));

// console.log("feeds",storedToken);
const headers = {
  // authorization: `Bearer ${storedToken}`,
  authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0MTc4M2FjMTdhYzM0NzIwZjI4NCIsImlhdCI6MTcwMzE2NjUyMCwiZXhwIjoxNzA1NzU4NTIwfQ.dkDckQKAgVB93AXmSJNgYtrpIPZ8j3Lis33APxsx39c`,
};

const struct = (arr) => {
  const data = arr.map(
    ({ _id, feedDetails, tags, createdAt, staus, user, upVotes }) => {
      const obj = {
        _id,
        name: user.name,
        feedDetails,
        tags,
        createdAt,
        staus,
        upVotes,
      };
      return obj;
    }
  );

  return data;
};

export const fetchFeeds = createAsyncThunk("about/fetchFeeds", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/all`
  );
  return response.data;
});

export const createFeed = createAsyncThunk("about/createFeed", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds`,
    data,
    { headers }
  );
  return response.data;
});

export const deleteFeed = createAsyncThunk("about/deleteFeed", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/${id}`,
    { headers }
  );
  return id;
});

export const updateFeed = createAsyncThunk(
  "about/updateFeed",
  async ({ id, updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/feeds/${id}`,
      updatedData,
      { headers }
    );
    return response.data;
  }
);

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
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feedData = struct(action.payload.feeds);
      })
      .addCase(createFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feedData?.concat(struct([action.payload.result]));
      })
      .addCase(deleteFeed.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.feedData = state.feedData.filter((e) => e._id !== id);
      })
      .addCase(updateFeed.fulfilled, (state, action) => {
        state.loading = false;
        const updateFeed = struct([action.payload.updatedFeed]);
        const index = state.feedData.findIndex(
          (e) => e._id === updateFeed[0]._id
        );
        if (index !== -1) {
          state.feedData[index] = updateFeed[0];
        }
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default feedSlice.reducer;
