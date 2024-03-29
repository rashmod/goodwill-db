import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Client from '../components/Client';
import { LoadingSkeletonArray } from '../UI/LoadingSkeleton';
import CONSTANT_LITERALS from '../Constants/Constants';
import LoadMoreButton from '../UI/LoadMoreButton';
import SearchBar from '../components/SearchBar';
import ClientNotFound from '../UI/ClientNotFound';
import { Navigate } from 'react-router-dom';
import { fetchClients } from '../features/ClientsSlice';

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
	// const page = useSelector((state) => state.clients.page);
	const filterPage = useSelector((state) => state.clients.filterPage);

	const user = useSelector((state) => state.user);
	const isSignedIn =
		user.isLoggedIn &&
		user.id.length > 0 &&
		user.status === CONSTANT_LITERALS.STATUS.SUCCESS &&
		user.error === '';

	const [expandedCard, setExpandedCard] = useState(null);
	const [isFilterActive, setIsFilterActive] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		if (isSignedIn) {
			dispatch(fetchClients());
		}
	}, [dispatch, isSignedIn]);

	if (!isSignedIn) {
		return (
			<Navigate
				to='/signup'
				replace={true}
				state={{ error: 'Access Restricted:', msg: 'Please Log In' }}
			/>
		);
	}

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

				{(isFilterActive &&
					filteredClients.length < filteredCount &&
					((filterPage === 1 &&
						getClientsStatus ===
							CONSTANT_LITERALS.STATUS.SUCCESS) ||
						filterPage > 1)) ||
				(!isFilterActive && clients.length < totalCount) ? (
					<LoadMoreButton isFilterActive={isFilterActive} />
				) : null}

				{isFilterActive &&
					filteredClients.length === 0 &&
					getClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS && (
						<ClientNotFound setIsFilterActive={setIsFilterActive} />
					)}
			</div>
		</>
	);
};

export default ClientList;
