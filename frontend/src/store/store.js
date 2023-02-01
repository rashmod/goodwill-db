import { configureStore } from '@reduxjs/toolkit';
import ClientsReducer from '../features/ClientsSlice';

const store = configureStore({ reducer: { clients: ClientsReducer } });

export default store;
