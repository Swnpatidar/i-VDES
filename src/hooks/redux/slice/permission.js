import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

export const permission = createSlice({
	name: "permission",
	initialState: {
		value: initialStateValue,
	},
	reducers: {
		setPermissionReducer: (state, action) => {
			state.value = action.payload;
		},
		clearPermissionReducer: (state) => {
			state.value = initialStateValue;
		},
	},
});

export const { setPermissionReducer, clearPermissionReducer } = permission.actions;
export default permission.reducer;