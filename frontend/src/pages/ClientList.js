import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Client from '../components/Client';
import { LoadingSkeletonArray } from '../UI/LoadingSkeleton';
import CONSTANT_LITERALS from '../Constants/Constants';
import LoadMoreButton from '../UI/LoadMoreButton';

const ClientList = () => {
	const clients = useSelector((state) => state.clients.clients);
	const getClientsStatus = useSelector(
		(state) => state.clients.getClientsStatus
	);
	const [expandedCard, setExpandedCard] = useState(null);

	return (
		<>
			<div className='container pb-5 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mt-4 mx-auto flex flex-col items-center'>
				{
					<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
						{getClientsStatus ===
						CONSTANT_LITERALS.STATUS.LOADING ? (
							<LoadingSkeletonArray />
						) : getClientsStatus ===
								CONSTANT_LITERALS.STATUS.SUCCESS ||
						  clients.length > 0 ? (
							clients.map((client) => (
								<Client
									key={client._id}
									client={client}
									expandedCard={expandedCard}
									setExpandedCard={setExpandedCard}
								/>
							))
						) : null}
					</div>
				}
				<LoadMoreButton />
			</div>
		</>
	);
};

export default ClientList;
