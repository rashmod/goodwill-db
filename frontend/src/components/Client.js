import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteClientFromDB } from '../features/ClientsSlice';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';
import CONSTANT_LITERALS from '../Constants/Constants';

const Client = ({ client, setExpandedCard, expandedCard }) => {
	const dispatch = useDispatch();

	const isExpanded = expandedCard === client._id;
	// ${isExpanded ? 'flex-col' : ''}
	return (
		<div
			className={`card cursor-pointer text-[#BFC0C0] bg-light-black border border-gray-200 border-opacity-30 rounded-lg hover:shadow-md hover:border-white transform hover:-translate-y-1 transition-all duration-200 flex flex-col ${
				isExpanded ? 'row-span-2 h-56 sm:h-auto' : ''
			}`}
			// onClick={expandCard}
			onClick={() => {
				if (isExpanded) return;
				setExpandedCard(client._id);
			}}>
			<div className='m-3'>
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
				<div className='m-3 mt-0 flex flex-col flex-grow justify-between'>
					<div>
						<p className='mb-1 text-sm'>
							Property Type:{' '}
							{capitalizeFirstLetter(client.propertyType)}
						</p>
						<p className='mb-1 text-sm'>
							Lead: {capitalizeFirstLetter(client.lead)}
						</p>
						{client.leadAgentName && (
							<p className='mb-1 text-sm'>
								Reference: {client.leadAgentName}
							</p>
						)}
						{client.leadOnlineName && (
							<p className='mb-1 text-sm'>
								Online Name:{' '}
								{capitalizeFirstLetter(client.leadOnlineName)}
							</p>
						)}
						{client.saleParty ===
							CONSTANT_LITERALS.SALE_PARTY.BUYER && (
							<p className='mb-1 text-sm'>
								Loan: {client.loan ? 'Yes' : 'No'}
							</p>
						)}

						<p className='mb-1 text-sm'>Deal Status: Ongoing</p>
					</div>
					<div className='flex justify-between mt-3 transition ease-in-out duration-75'>
						<button
							className='bg-red-500/75 py-1 px-2 rounded-md hover:bg-red-400'
							onClick={() => {
								dispatch(deleteClientFromDB(client._id));
								console.log('delete clicked');
							}}>
							Delete
						</button>
						<button
							className='h-10 w-10'
							onClick={() => {
								setExpandedCard(null);
							}}>
							<svg
								id='Icons'
								version='1.1'
								viewBox='0 0 32 32'
								className='fill-[#BFC0C0]/50 hover:fill-[#BFC0C0]'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M21.7,18.7C21.5,18.9,21.3,19,21,19s-0.5-0.1-0.7-0.3  L16,14.4l-4.3,4.3c-0.4,0.4-1,0.4-1.4,0s-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0l5,5C22.1,17.7,22.1,18.3,21.7,18.7z' />
							</svg>
						</button>
						<Link
							className='bg-accent/75 py-1 px-2 rounded-md hover:bg-accent'
							to='/updateClient'
							state={{ client }}>
							<span className='inline-block align-middle'>
								Update
							</span>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Client;
