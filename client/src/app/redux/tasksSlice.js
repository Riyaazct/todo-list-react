import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../services/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ userId, taskStatus }) => {
    const response = await api.get(`/tasks/${userId}/${taskStatus}`);
    return response.data;
  }
);

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
