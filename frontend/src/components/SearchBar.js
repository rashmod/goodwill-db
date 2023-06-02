import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClients } from '../features/ClientsSlice';

const SearchBar = ({ filters, setIsFilterActive }) => {
	const dispatch = useDispatch();

	const [searchState, setSearchState] = useState('');

	const onSubmitHandler = (e) => {
		e.preventDefault();

		setIsFilterActive(true);
		dispatch(fetchClients({ keyword: searchState, ...filters }));
	};
	return (
		<form className='w-full flex items-center' onSubmit={onSubmitHandler}>
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
					value={searchState}
					onChange={(e) => setSearchState(e.target.value)}
				/>
			</div>
			<button
				type='submit'
				className='inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium bg-transparent border rounded transition ease-in-out hover:border-accent hover:bg-accent'>
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
		</form>
	);
};

export default SearchBar;
