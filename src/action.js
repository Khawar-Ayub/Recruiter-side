import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  email: "",
  id: 0,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "recruiter",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
