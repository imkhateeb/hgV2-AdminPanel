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
    ({ _id, name, description, lead, subtopics, coordinators, image }) => {
      const obj = {
        _id,
        name,
        description,
        lead,
        subtopics,
        coordinators,
        image,
      };
      return obj;
    }
  );

  return data;
};

export const fetchSubTopics = createAsyncThunk("about/fetchsubtopics", async ({id}) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/subtopics/getsubtopics/${id}`
  );
  console.log(response.data);
  return response.data;
});

export const createSubTopic = createAsyncThunk("about/createSubTopic", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/subtopics`,
    data,
    { headers }
  );
  return response.data;
});

export const deleteSubTopic = createAsyncThunk("about/deleteSubTopic", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/subtopics/${id}`,
    { headers }
  );
  return id;
});

export const updateSubTopic = createAsyncThunk(
  "about/updateSubTopic",
  async ({updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/subtopics/addResource`,
      updatedData,
      { headers }
    );
    return response.data;
  }
);

// Slice for subtopics
const subtopicslice = createSlice({
  name: "subtopics",
  initialState: {
    subTopicData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchsubtopics.fulfilled, (state, action) => {
        state.loading = false;
        state.subTopicData = struct(action.payload);
      })
      .addCase(createSubTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.subTopicData?.concat(struct([action.payload]));
      })
      .addCase(deleteSubTopic.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.subTopicData = state.subTopicData.filter((e) => e._id !== id);
      })
      .addCase(updateSubTopic.fulfilled, (state, action) => {
        state.loading = false;
        const updateSubTopic = struct([action.payload]);
        const index = state.subTopicData.findIndex(
          (e) => e._id === updateSubTopic[0]._id
        );
        if (index !== -1) {
          state.subTopicData[index] = updateSubTopic[0];
        }
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default subtopicslice.reducer;
