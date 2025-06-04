import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const FileUpload = createSlice({
	name: "FileUpload",
	initialState: {
		value: initialStateValue,
	},
	reducers: {
		setfileUploadReducer: (state, action) => {
			state.value = action.payload;
		},

	},
});

export const { setfileUploadReducer } = FileUpload.actions;
export default FileUpload.reducer;