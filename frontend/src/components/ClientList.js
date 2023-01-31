import React from 'react';
import Client from './Client';

const ClientList = () => {
	return (
		<>
			<div className='container max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mt-4 mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
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
