import React from 'react';
import ClientForm from '../components/ClientForm';

const AddClient = () => {
	return (
		<div className='my-20 w-full'>
			<h1 className='text-center text-2xl sm:text-4xl font-bold mb-6'>
				Add Client Information
			</h1>
			<ClientForm />
		</div>
	);
};

export default AddClient;
