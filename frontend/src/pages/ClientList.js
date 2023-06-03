import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Client from '../components/Client';
import { LoadingSkeletonArray } from '../UI/LoadingSkeleton';
import CONSTANT_LITERALS from '../Constants/Constants';
import LoadMoreButton from '../UI/LoadMoreButton';
import SearchBar from '../components/SearchBar';
import ClientNotFound from '../UI/ClientNotFound';

const ClientList = () => {
	const clients = useSelector((state) => state.clients.clients);
	const filteredClients = useSelector(
		(state) => state.clients.filteredClients
	);
	const getClientsStatus = useSelector(
		(state) => state.clients.getClientsStatus
	);
	const filteredCount = useSelector((state) => state.clients.filteredCount);
	const totalCount = useSelector((state) => state.clients.totalCount);

	const [expandedCard, setExpandedCard] = useState(null);
	const [isFilterActive, setIsFilterActive] = useState(false);

	return (
		<>
			<div className='container pb-5 px-3 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mt-4 mx-auto flex flex-col items-center'>
				<SearchBar setIsFilterActive={setIsFilterActive} />
				{
					<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
						{!isFilterActive &&
							(getClientsStatus ===
								CONSTANT_LITERALS.STATUS.SUCCESS ||
								clients.length > 0) &&
							clients.map((client) => (
								<Client
									key={client._id}
									client={client}
									expandedCard={expandedCard}
									setExpandedCard={setExpandedCard}
								/>
							))}
						{isFilterActive &&
							(getClientsStatus ===
								CONSTANT_LITERALS.STATUS.SUCCESS ||
								filteredClients.length > 0) &&
							filteredClients.map((client) => (
								<Client
									key={client._id}
									client={client}
									expandedCard={expandedCard}
									setExpandedCard={setExpandedCard}
								/>
							))}
						{getClientsStatus ===
							CONSTANT_LITERALS.STATUS.LOADING && (
							<LoadingSkeletonArray />
						)}
					</div>
				}
				{(isFilterActive && filteredClients.length < filteredCount) ||
				(!isFilterActive && clients.length < totalCount) ? (
					<LoadMoreButton isFilterActive={isFilterActive} />
				) : null}
				{isFilterActive && filteredClients.length === 0 && (
					<ClientNotFound setIsFilterActive={setIsFilterActive} />
				)}
			</div>
		</>
	);
};

export default ClientList;
