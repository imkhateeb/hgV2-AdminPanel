import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const storedToken = JSON.parse(localStorage.getItem("token"));

const headers = {
  authorization: `Bearer ${storedToken}`,
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

export const fetchWing = createAsyncThunk(
  "about/getWing",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings/${id}`,
    )
    return response.data;
  }
)

export const getWingLevels = createAsyncThunk(
  "about/getWingLevels",
  async ({id}) => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URI}/api/wings/levels/${id}`,
    )
    return response.data;
  }
)
// Slice for wings
const wingslice = createSlice({
  name: "wings",
  initialState: {
    WingData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchWings.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        updateWing.pending,
        (state) => {
          // state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteWing.pending,
        (state) => {
          // state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        createWing.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchWings.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addCase(
        updateWing.rejected,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      ).addCase(
        deleteWing.rejected,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        createWing.rejected,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(fetchWings.fulfilled, (state, action) => {
        state.loading = false;
        state.WingData = struct(action.payload);
      })
      .addCase(createWing.fulfilled, (state, action) => {
        state.loading = false;
        state.WingData?.concat(struct([action.payload]));
      })
      .addCase(deleteWing.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.WingData = state.WingData.filter((e) => e._id !== id);
      })
      .addCase(updateWing.fulfilled, (state, action) => {
        state.loading = false;
        const updateWing = struct([action.payload]);
        const index = state.WingData.findIndex(
          (e) => e._id === updateWing[0]._id
        );
        if (index !== -1) {
          state.WingData[index] = updateWing[0];
        }
      });
  },
});

export default wingslice.reducer;
