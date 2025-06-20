import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  idToken: null,
  refreshToken: null,
};
const authAmplifySessionSlice = createSlice({
  name: "amplifyAuthSession",
  initialState,
  reducers: {
    setAmplifyAuthSession: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
    },
    clearAmplifyAuthSession: (state) => {
      state.accessToken = null;
      state.idToken = null;
    },
  },
});
export const {setAmplifyAuthSession,clearAmplifyAuthSession}=authAmplifySessionSlice.actions
export default authAmplifySessionSlice.reducer