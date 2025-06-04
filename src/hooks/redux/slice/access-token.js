import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

export const accessToken = createSlice({
	name: "accessToken",
	initialState: {
		value: initialStateValue,
	},
	reducers: {
		setAccessTokenReducer: (state, action) => {
			state.value = action.payload;
		},
		clearAccessTokenReducer: (state) => {
			state.value = initialStateValue;
		},
	},
});

export const { setAccessTokenReducer, clearAccessTokenReducer } = accessToken.actions;
export default accessToken.reducer;