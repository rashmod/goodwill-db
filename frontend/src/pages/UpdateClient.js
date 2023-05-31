import React from 'react';
import { useLocation } from 'react-router-dom';
import ClientForm from '../components/ClientForm';

const UpdateClient = () => {
	const location = useLocation();
	const client = location.state;

	return (
		<div className='my-20 w-full'>
			<h1 className='text-center text-2xl sm:text-4xl font-bold mb-6'>
				Update Client Information
			</h1>
			<ClientForm updateClient={client} />
		</div>
	);
};

export default UpdateClient;
