import React from 'react';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';
import CONSTANT_LITERALS from '../Constants/Constants';
import UpdateButton from '../UI/UpdateButton';
import CollapseButton from '../UI/CollapseButton';
import DeleteButton from '../UI/DeleteButton';

const Client = ({ client, setExpandedCard, expandedCard }) => {
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

						<p className='mb-1 text-sm'>
							Deal Status:{' '}
							{capitalizeFirstLetter(client.dealStatus)}
						</p>
					</div>
					<div className='flex justify-between mt-3 transition ease-in-out duration-75'>
						<DeleteButton clientId={client._id} />
						<CollapseButton setExpandedCard={setExpandedCard} />
						<UpdateButton client={client} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Client;
