import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CONSTANT_LITERALS from '../Constants/Constants';

const initialState = {
	clients: [],
	filteredClients: [],
	getClientsStatus: '',
	getClientsError: '',
	addClientsStatus: '',
	addClientsError: '',
	deleteClientsStatus: '',
	deleteClientsError: '',
	updateClientsStatus: '',
	updateClientsError: '',
	page: 1,
	filterPage: 1,
	totalCount: 0,
	filteredCount: 0,
};

export const fetchClients = createAsyncThunk(
	'clients/fetchClients',
	async (filters = {}, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/clients`,
				{ params: filters }
			);

			return {
				data: response.data.data,
				filters,
				totalCount: response.data.totalClientCount,
				filteredCount: response.data.filteredCount,
			};
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const loadMoreClients = createAsyncThunk(
	'clients/loadMoreClients',
	async ({ filters, page }, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/clients`,
				{ params: { ...filters, page } }
			);
			return { data: response.data.data, filters };
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

export const deleteClientFromDB = createAsyncThunk(
	'clients/deleteClientFromDB',
	async (clientId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BASEURL}/clients/${clientId}`
			);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateClientToDB = createAsyncThunk(
	'clients/updateClientToDB',
	async ({ clientId, clientData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_BASEURL}/clients/${clientId}`,
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
	reducers: {
		resetStatus(state) {
			state.getClientsStatus = '';
			state.addClientsStatus = '';
			state.deleteClientsStatus = '';
			state.updateClientsStatus = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchClients.pending, (state, action) => {
			state.getClientsStatus = CONSTANT_LITERALS.STATUS.LOADING;
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(fetchClients.fulfilled, (state, action) => {
			const { data, filters, totalCount, filteredCount } = action.payload;

			const filtersLen = Object.keys(filters).length;
			const isFilterObj = filters.constructor === Object;

			if (filtersLen === 0 && isFilterObj) {
				state.clients = data;
				state.filteredClients = [];
				state.filterPage = 1;
			} else {
				state.filteredClients = data;
			}

			state.getClientsStatus = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
			state.totalCount = totalCount;
			state.filteredCount = filteredCount;
		});
		builder.addCase(fetchClients.rejected, (state, action) => {
			state.getClientsStatus = CONSTANT_LITERALS.STATUS.FAILURE;
			state.getClientsError = action.payload;
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});

		builder.addCase(loadMoreClients.pending, (state, action) => {
			state.getClientsStatus = CONSTANT_LITERALS.STATUS.LOADING;
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(loadMoreClients.fulfilled, (state, action) => {
			const { data, filters } = action.payload;

			const filtersLen = Object.keys(filters).length;
			const isFilterObj = filters.constructor === Object;

			if (filtersLen === 0 && isFilterObj) {
				state.clients = state.clients.concat(data);
				state.page++;
			} else {
				state.filteredClients = state.filteredClients.concat(data);
				state.filterPage++;
			}

			state.getClientsStatus = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(loadMoreClients.rejected, (state, action) => {
			state.getClientsStatus = CONSTANT_LITERALS.STATUS.FAILURE;
			state.getClientsError = action.payload;
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});

		builder.addCase(addClientToDB.pending, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = CONSTANT_LITERALS.STATUS.LOADING;
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(addClientToDB.fulfilled, (state, action) => {
			state.clients = [action.payload, ...state.clients];
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(addClientToDB.rejected, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = CONSTANT_LITERALS.STATUS.FAILURE;
			state.addClientsError = action.payload;
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});

		builder.addCase(deleteClientFromDB.pending, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = CONSTANT_LITERALS.STATUS.LOADING;
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(deleteClientFromDB.fulfilled, (state, action) => {
			state.clients = state.clients.filter(
				(client) => client._id !== action.payload._id
			);
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.deleteClientsError = '';
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(deleteClientFromDB.rejected, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = CONSTANT_LITERALS.STATUS.FAILURE;
			state.deleteClientsError = action.payload;
			state.updateClientsStatus = '';
			state.updateClientsError = '';
		});
		builder.addCase(updateClientToDB.pending, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = CONSTANT_LITERALS.STATUS.LOADING;
			state.updateClientsError = '';
		});
		builder.addCase(updateClientToDB.fulfilled, (state, action) => {
			const updatedClients = state.clients.map((client) => {
				if (client._id === action.payload._id) {
					return action.payload;
				} else {
					return client;
				}
			});

			state.clients = updatedClients;
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = CONSTANT_LITERALS.STATUS.SUCCESS;
			state.updateClientsError = '';
		});
		builder.addCase(updateClientToDB.rejected, (state, action) => {
			state.getClientsStatus = '';
			state.getClientsError = '';
			state.addClientsStatus = '';
			state.addClientsError = '';
			state.deleteClientsStatus = '';
			state.deleteClientsError = '';
			state.updateClientsStatus = CONSTANT_LITERALS.STATUS.FAILURE;
			state.updateClientsError = action.payload;
		});
	},
});

export const { resetStatus } = ClientsSlice.actions;
export default ClientsSlice.reducer;
