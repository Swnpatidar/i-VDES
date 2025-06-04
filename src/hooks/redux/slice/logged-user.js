import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const loggedUser = createSlice({
	name: "loggedUser",
	initialState: {
		value: initialStateValue,
	},
	reducers: {
		setLoggedUserReducer: (state, action) => {
			state.value = action.payload;
		},
		clearLoggedUserReducer: (state) => {
			state.value = initialStateValue;
		},
	},
});

export const { setLoggedUserReducer, clearLoggedUserReducer } = loggedUser.actions;
export default loggedUser.reducer;