import React from 'react';
import Client from './Client';

const ClientList = () => {
	return (
		<>
			<div className='container mt-4 mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					<Client />
					<Client />
					<Client />
					<Client />
					<Client />
				</div>
			</div>
		</>
	);
};

export default ClientList;
