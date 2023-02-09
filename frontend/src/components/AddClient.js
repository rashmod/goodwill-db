import React from 'react';
import ClientForm from './ClientForm';

const AddClient = () => {
	// * when saving to backend check property key
	// todo make file for data constants
	// todo show commas in budget input
	// todo unit in area input
	// todo prevent spaces in mobile field
	// todo add loader
	// todo don't change state if data not added to backend

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
