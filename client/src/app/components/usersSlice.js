import { createSlice } from "@reduxjs/toolkit";
import TokenService from "../services/token.service";

const user = TokenService.getUSer();

const initialState = {
  userId: null,
  isLoggedIn: false,
  userDetails: user,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      const { userId, userDetails } = action.payload;
      state.userId = userId;
      state.isLoggedIn = true;
      state.userDetails = userDetails;
    },
    logoutUser(state) {
      state.userId = null;
      state.isLoggedIn = false;
      state.userDetails = null;
    },
    updateUserDetails(state, action) {
      const { userDetails } = action.payload;
      state.userDetails = userDetails;
    },
  },
});

export const { loginUser, logoutUser, updateUserDetails } =
  usersSlice.actions;

export const selectUserId = (state) => state.users.userId;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export const selectUserDetails = (state) => state.users.userDetails;

export default usersSlice.reducer;
