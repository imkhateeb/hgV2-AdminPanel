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

export const fetchLevels = createAsyncThunk("about/fetchlevels", async ({id}) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/levels/getlevelbywingid/${id}`
  );
  console.log(response.data);
  return response.data;
});

export const createLevel = createAsyncThunk("about/createLevel", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/levels`,
    data,
    { headers }
  );
  return response.data;
});

export const deleteLevel = createAsyncThunk("about/deleteLevel", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/levels/${id}`,
    { headers }
  );
  return id;
});

export const updateLevel = createAsyncThunk(
  "about/updateLevel",
  async ({ id, updatedData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/levels/${id}`,
      updatedData,
      { headers }
    );
    return response.data;
  }
);

export const fetchLevel = createAsyncThunk("about/getLevel", async ({ id }) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BACKEND_URI}/api/levels/getparticularlevel/${id}`
  );
  return response.data;
});

// Slice for levels
const levelslice = createSlice({
  name: "levels",
  initialState: {
    levelData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchlevels.fulfilled, (state, action) => {
        state.loading = false;
        state.levelData = struct(action.payload);
      })
      .addCase(createLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.levelData?.concat(struct([action.payload]));
      })
      .addCase(deleteLevel.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.levelData = state.levelData.filter((e) => e._id !== id);
      })
      .addCase(updateLevel.fulfilled, (state, action) => {
        state.loading = false;
        const updateLevel = struct([action.payload]);
        const index = state.levelData.findIndex(
          (e) => e._id === updateLevel[0]._id
        );
        if (index !== -1) {
          state.levelData[index] = updateLevel[0];
        }
      })
      .addMatcher(isPendingOrRejectedAction, handlePendingAndRejected);
  },
});

export default levelslice.reducer;
