import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CONSTANT_LITERALS from '../Constants/Constants';

const initialState = { id: '', status: '', error: '', isLoggedIn: false };

export const userSignUp = createAsyncThunk(
	'user/userSignUp',
	async (dummy = null, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/auth/signup`,
				{ withCredentials: true }
			);

			return response.data.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const userSignOut = createAsyncThunk(
	'user/userSignOut',
	async (dummy = null, { rejectWithValue }) => {
		try {
			await axios.get(`${process.env.REACT_APP_BASEURL}/auth/signout`, {
				withCredentials: true,
			});

			return;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(userSignUp.pending, (state, action) => {
			state.status = CONSTANT_LITERALS.STATUS.LOADING;
			state.error = '';
			state.id = '';
			state.isLoggedIn = false;
		});

		builder.addCase(userSignUp.fulfilled, (state, action) => {
			state.status = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.id = action.payload._id;
			state.isLoggedIn = true;
			state.error = '';
		});

		builder.addCase(userSignUp.rejected, (state, action) => {
			state.status = CONSTANT_LITERALS.STATUS.FAILURE;
			state.error = action.payload.error;
			state.isLoggedIn = false;
			state.id = '';
		});

		builder.addCase(userSignOut.pending, (state, action) => {
			state.status = CONSTANT_LITERALS.STATUS.LOADING;
			state.error = '';
			state.id = '';
			state.isLoggedIn = true;
		});

		builder.addCase(userSignOut.fulfilled, (state, action) => {
			state.status = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.id = '';
			state.isLoggedIn = false;
			state.error = '';
		});

		builder.addCase(userSignOut.rejected, (state, action) => {
			state.status = CONSTANT_LITERALS.STATUS.FAILURE;
			state.error = action.payload.error;
			state.isLoggedIn = false;
			state.id = '';
		});
	},
});

export default UserSlice.reducer;
