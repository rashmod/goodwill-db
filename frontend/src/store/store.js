import { configureStore } from '@reduxjs/toolkit';
import ClientsReducer from '../features/ClientsSlice';
import FiltersReducer from '../features/FiltersSlice';

const store = configureStore({
	reducer: { clients: ClientsReducer, filters: FiltersReducer },
});

export default store;
