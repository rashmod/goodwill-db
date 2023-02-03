import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	clients: [],
	getClientsStatus: '',
	getClientsError: '',
	addClientsStatus: '',
	addClientsError: '',
	deleteClientsStatus: '',
	deleteClientsError: '',
};

export const fetchAllClients = createAsyncThunk(
	'clients/fetchAllClients',
	async (dummyArgument = null, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/clients`
			);

			return response.data.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const addClientToDB = createAsyncThunk(
	'clients/addClientToDB',
	async (clientData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASEURL}/clients`,
				clientData
			);

			return response.data.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const ClientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllClients.pending, (state, action) => {
			state.getClientsStatus = 'LOADING';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
		});
		builder.addCase(fetchAllClients.fulfilled, (state, action) => {
			state.clients = action.payload;
			state.getClientsStatus = 'SUCCESS';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
		});
		builder.addCase(fetchAllClients.rejected, (state, action) => {
			state.getClientsStatus = 'FAILURE';
			state.getClientsError = action.payload;
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
		});

		builder.addCase(addClientToDB.pending, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = 'LOADING';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
		});
		builder.addCase(addClientToDB.fulfilled, (state, action) => {
			state.clients = [action.payload, ...state.clients];
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = 'SUCCESS';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
		});
		builder.addCase(addClientToDB.rejected, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = 'FAILURE';
			state.addClientsError = action.payload;
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
		});
	},
});

export default ClientsSlice.reducer;
