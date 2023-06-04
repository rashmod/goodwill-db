import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreClients } from '../features/ClientsSlice';
import CONSTANT_LITERALS from '../Constants/Constants';
import removeEmpty from '../utilities/removeEmpty';
import LoadMoreButtonLoadingSpinnerSVG from '../assets/svg/LoadMoreButtonLoadingSpinnerSVG';
import LoadMoreButtonDownArrowSVG from '../assets/svg/LoadMoreButtonDownArrowSVG';

const LoadMoreButton = ({ isFilterActive }) => {
	const dispatch = useDispatch();

	const getClientsStatus = useSelector(
		(state) => state.clients.getClientsStatus
	);
	const page = useSelector((state) => state.clients.page);
	const filterPage = useSelector((state) => state.clients.filterPage);
	const filters = removeEmpty(useSelector((state) => state.filters));

	const onClickHandler = (e) => {
		if (isFilterActive) {
			dispatch(
				loadMoreClients({
					page: filterPage + 1,
					filters: filters,
				})
			);
		} else {
			dispatch(loadMoreClients({ page: page + 1, filters: {} }));
		}
	};

	return (
		<button
			disabled={getClientsStatus === CONSTANT_LITERALS.STATUS.LOADING}
			className={`min-w-fit w-40 bg-transparent border py-2 mt-6 transition ease-in-out hover:border-accent hover:bg-accent ${
				getClientsStatus === CONSTANT_LITERALS.STATUS.LOADING
					? 'cursor-progress bg-accent border-accent'
					: ''
			}`}
			onClick={onClickHandler}>
			{getClientsStatus === CONSTANT_LITERALS.STATUS.LOADING && (
				<LoadMoreButtonLoadingSpinnerSVG />
			)}

			{(getClientsStatus === '' ||
				getClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS) && (
				<LoadMoreButtonDownArrowSVG />
			)}
			<span>Load More</span>
		</button>
	);
};

export default LoadMoreButton;
