import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteClientFromDB } from '../features/ClientsSlice';

const Client = ({ client, setExpandedCard, expandedCard }) => {
	const dispatch = useDispatch();

	const isExpanded = expandedCard === client._id;
	// ${isExpanded ? 'flex-col' : ''}
	return (
		<div
			className={`card cursor-pointer bg-light-black border border-gray-200 border-opacity-30 rounded-lg hover:shadow-md hover:border-white transform hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between ${
				isExpanded ? 'row-span-2 h-64 sm:h-auto' : ''
			}`}
			// onClick={expandCard}
			onClick={() => {
				if (isExpanded) return;
				setExpandedCard(client._id);
			}}>
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
			{isExpanded && (
				<div className='w-full flex justify-between'>
					{/* <p>{client.lead}</p>
					<p>{client.leadAgentName}</p>
					<p>{client.leadOnlineName}</p>
					<p>{client.loan}</p>
					<p>{client.propertyType}</p> */}
					<button
						className='bg-red-400'
						onClick={() => {
							dispatch(deleteClientFromDB(client._id));
							console.log('delete clicked');
						}}>
						Delete
					</button>
					<button
						className='bg-orange-300'
						onClick={() => {
							setExpandedCard(null);
						}}>
						Collapse
					</button>
					<Link
						className='bg-lime-400'
						to='/updateClient'
						state={{ client }}>
						Update
					</Link>
				</div>
			)}
		</div>
	);
};

export default Client;
