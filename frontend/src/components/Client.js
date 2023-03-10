import React from 'react';

const Client = ({ client }) => {
	return (
		<div className='card cursor-pointer bg-light-black border border-gray-200 border-opacity-30 rounded-lg hover:shadow-md hover:border-white transform hover:-translate-y-1 transition-all duration-200'>
			<div className='m-3 text-[#BFC0C0]'>
				<div className='flex justify-between mb-2'>
					<h2 className='text-lg'>{client.name}</h2>
					<div>
						<span className='text-xs py-1 bg-[#243b55] inline rounded-full rounded-r-none px-2'>
							{client.clientType}
						</span>
						<span className='text-xs py-1 text-black bg-[#BFC0C0] inline rounded-full rounded-l-none px-2'>
							{client.clientType === 'RENT'
								? client.rentParty
								: client.saleParty}
						</span>
					</div>
				</div>
				<div className='flex justify-between items-center mb-1'>
					<p className='md:tracking-wider tracking-normal'>
						{client.mobile}
					</p>
					<p>{client.budget.toLocaleString('en-IN')}</p>
				</div>
				<div className='flex justify-between items-center mb-1'>
					<p className='text-sm'>{client.size}</p>
					<p className='text-sm'>{client.sqft} SQ.FT.</p>
				</div>
				<p className='text-sm'>{client.address}</p>
			</div>
		</div>
	);
};

export default Client;
