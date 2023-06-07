import { configureStore } from '@reduxjs/toolkit';
import ClientsReducer from '../features/ClientsSlice';
import FiltersReducer from '../features/FiltersSlice';
import UserReducer from '../features/UserSlice';

const store = configureStore({
	reducer: {
		clients: ClientsReducer,
		filters: FiltersReducer,
		user: UserReducer,
	},
});

export default store;
