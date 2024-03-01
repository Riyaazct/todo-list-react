import { createSlice } from "@reduxjs/toolkit";

import TokenService from "../services/token.service";

const user = TokenService.getUSer();

const initialState = {
  isLoggedIn: false,
  userDetails: user ? user : {},
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = usersSlice.actions;

export const selectUserId = (state) => state.user.userDetails.id;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserDetails = (state) => state.user.userDetails;

export default usersSlice.reducer;
