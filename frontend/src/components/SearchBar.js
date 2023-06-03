import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import { updateSearch } from '../features/FiltersSlice';
import { fetchClients } from '../features/ClientsSlice';
import removeEmpty from '../utilities/removeEmpty';
import debounce from '../utilities/debounce';

const SearchBar = ({ setIsFilterActive }) => {
	const dispatch = useDispatch();

	const filters = useSelector((state) => state.filters);

	const [showFilter, setShowFilter] = useState(false);

	const handleSearch = useMemo(
		() => debounce((inputVal) => dispatch(updateSearch(inputVal)), 200),
		[dispatch]
	);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		dispatch(fetchClients(removeEmpty(filters)));

		if (Object.keys(removeEmpty(filters)).length === 0) {
			setIsFilterActive(false);
		} else {
			setIsFilterActive(true);
		}
	};

	return (
		<form className='w-full p-0 mb-6' onSubmit={onSubmitHandler}>
			<div className='w-full flex items-center flex-wrap sm:flex-nowrap gap-2'>
				<button
					type='button'
					className='inline-flex items-center order-last sm:order-none sm:grow-0 grow py-2.5 px-3 text-sm font-medium bg-transparent border rounded transition ease-in-out hover:border-accent hover:bg-accent'
					onClick={() => setShowFilter((prev) => !prev)}>
					<svg
						className='w-5 h-5 mr-2 -ml-1 text-white'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							// strokeWidth='2'
							d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'></path>
					</svg>
					Filter
				</button>
				<div className='relative w-full'>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<svg
							aria-hidden='true'
							className='w-5 h-5 text-gray-500 dark:text-gray-400'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
					<input
						type='text'
						id='voice-search'
						className='block w-full bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none text-sm pl-10 p-2.5'
						placeholder='Search by Name or Address'
						name='keyword'
						onChange={(e) => {
							handleSearch(e.target.value);
						}}
					/>
				</div>
				<button
					type='submit'
					className='inline-flex items-center grow sm:grow-0 py-2.5 px-3 text-sm font-medium bg-transparent border rounded transition ease-in-out hover:border-accent hover:bg-accent'>
					<svg
						aria-hidden='true'
						className='w-5 h-5 mr-2 -ml-1'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
					Search
				</button>
			</div>
			{showFilter && <Filter setShowFilter={setShowFilter} />}
		</form>
	);
};

export default SearchBar;
