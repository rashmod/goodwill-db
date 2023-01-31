import React from 'react';

const Client = () => {
	return (
		<div className='card m-2 cursor-pointer bg-light-black border border-gray-200 border-opacity-30 rounded-lg hover:shadow-md hover:border-white transform hover:-translate-y-1 transition-all duration-200'>
			<div className='m-3 text-[#BFC0C0]'>
				<div className='flex justify-between mb-2'>
					<h2 className='text-lg'>Name Name</h2>
					<div>
						<span className='text-sm py-1 bg-[#243b55] inline rounded-full rounded-r-none px-2'>
							Sale
						</span>
						<span className='text-sm py-1 text-black bg-[#BFC0C0] inline rounded-full rounded-l-none px-2'>
							Buyer
						</span>
					</div>
				</div>
				<div className='flex justify-between items-center mb-1'>
					<p className='tracking-widest'>8828477708</p>
					<p>1,50,00,000</p>
				</div>
				<div className='flex justify-between items-center mb-1'>
					<p className='text-sm'>2BHK</p>
					<p className='text-sm'>650 SQ.FT.</p>
				</div>
				<p className='text-sm'>
					Space, the final frontier. These are the voyages of the
				</p>
			</div>
		</div>
	);
};

export default Client;
