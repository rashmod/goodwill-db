import AddClient from './components/AddClient';
import ClientList from './components/ClientList';

function App() {
	return (
		<div className='App bg-gradient-bg text-white min-h-screen h-full flex flex-col items-center justify-center'>
			{/* <AddClient /> */}
			<ClientList />
		</div>
	);
}

export default App;
