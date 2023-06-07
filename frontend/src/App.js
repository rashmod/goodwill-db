import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AddClient from './pages/AddClient';
import ClientList from './pages/ClientList';
import Navbar from './UI/Navbar';
import UpdateClient from './pages/UpdateClient';
import { fetchClients } from './features/ClientsSlice';
import SignUp from './pages/SignUp';
import { userSignUp } from './features/UserSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	useEffect(() => {
		dispatch(userSignUp());
	}, [dispatch]);

	return (
		<div className='App bg-gradient-bg text-white min-h-screen h-full'>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-full'>
				<Routes>
					<Route path='/' element={<ClientList />} />
					<Route path='/addClient' element={<AddClient />} />
					<Route path='/updateClient' element={<UpdateClient />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
