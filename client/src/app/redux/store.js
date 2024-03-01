import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    tasks: tasksReducer,
  },
});
