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

const struct = (arr) => {
  const data = arr.map(
    ({ _id, name, description, lead, topics, coordinators, image }) => {
      const obj = {
        _id,
        name,
        description,
        lead,
        topics,
        coordinators,
        image,
      };
      return obj;
    }
  );

  return data;
};

export const fetchTopics = createAsyncThunk("about/fetchtopics", async ({id}) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/topics/gettopicsbylevel/${id}`
  );
  console.log(response.data);
  return response.data;
});

export const createTopic = createAsyncThunk("about/createTopic", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/topics`,
    data,
    { headers }
  );
  return response.data;
});

export const deleteTopic = createAsyncThunk("about/deleteTopic", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/topics/${id}`,
    { headers }
  );
  return id;
});

export const updateTopic = createAsyncThunk(
  "about/updateTopic",
  async ({ id, updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/topics/${id}`,
      updatedData,
      { headers }
    );
    return response.data;
  }
);

// Slice for topics
const topicslice = createSlice({
  name: "topics",
  initialState: {
    topicData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchtopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topicData = struct(action.payload);
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topicData?.concat(struct([action.payload]));
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.topicData = state.topicData.filter((e) => e._id !== id);
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        const updateTopic = struct([action.payload]);
        const index = state.topicData.findIndex(
          (e) => e._id === updateTopic[0]._id
        );
        if (index !== -1) {
          state.topicData[index] = updateTopic[0];
        }
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default topicslice.reducer;
