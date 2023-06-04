import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import { updateSearch } from '../features/FiltersSlice';
import { fetchClients } from '../features/ClientsSlice';
import removeEmpty from '../utilities/removeEmpty';
import debounce from '../utilities/debounce';
import FilterSVG from '../assets/svg/FilterSVG';
import SearchInputMagnifyingSVG from '../assets/svg/SearchInputMagnifyingSVG';
import SearchButtonMagnifyingSVG from '../assets/svg/SearchButtonMagnifyingSVG';

const SearchBar = ({ setIsFilterActive }) => {
	const dispatch = useDispatch();

	const filters = useSelector((state) => state.filters);
	const keyword = useSelector((state) => state.filters.keyword);

	const [showFilter, setShowFilter] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState('');

	useEffect(() => {
		if (keyword === '') {
			setSearchKeyword('');
		}
	}, [keyword]);

	const handleSearch = useMemo(
		() => debounce((inputVal) => dispatch(updateSearch(inputVal)), 200),
		[dispatch]
	);

	const searchHandler = () => {
		if (Object.keys(removeEmpty(filters)).length === 0) {
			setIsFilterActive(false);
		} else {
			setIsFilterActive(true);
		}
		setShowFilter(false);
	};

	const searchInputHandler = (e) => {
		handleSearch(e.target.value);
		setSearchKeyword(e.target.value);
	};

	const filterHandler = () => setShowFilter((prev) => !prev);

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
					onClick={filterHandler}>
					<FilterSVG />
					Filter
				</button>
				<div className='relative w-full'>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<SearchInputMagnifyingSVG />
					</div>
					<input
						type='text'
						id='voice-search'
						className='block w-full bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none text-sm pl-10 p-2.5'
						placeholder='Search by Name or Address'
						name='keyword'
						value={searchKeyword}
						onChange={searchInputHandler}
					/>
				</div>
				<button
					type='submit'
					onClick={searchHandler}
					className='inline-flex items-center grow sm:grow-0 py-2.5 px-3 text-sm font-medium bg-transparent border rounded transition ease-in-out hover:border-accent hover:bg-accent'>
					<SearchButtonMagnifyingSVG />
					Search
				</button>
			</div>
			{showFilter && (
				<Filter
					setShowFilter={setShowFilter}
					setIsFilterActive={setIsFilterActive}
				/>
			)}
		</form>
	);
};

export default SearchBar;
