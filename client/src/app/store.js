import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../app/components/usersSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});
