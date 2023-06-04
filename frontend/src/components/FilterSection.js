import React, { useMemo } from 'react';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../features/FiltersSlice';
import debounce from '../utilities/debounce';

const FilterSection = ({ label, options, name, inputType = 'radio' }) => {
	const dispatch = useDispatch();
	const filterValue = useSelector((state) => state.filters[name]);

	const handleRadioChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.checked && filterValue === value) {
			e.target.checked = false;
		}

		dispatch(updateFilter({ name, value: e.target.checked ? value : '' }));
	};

	const handleInputChange = useMemo(
		() =>
			debounce(
				(name, value) => dispatch(updateFilter({ name, value })),
				300
			),
		[dispatch]
	);

	return (
		<div>
			<h3 className='mb-2 font-medium text-base'>
				{inputType === 'radio' && label}
				{inputType === 'text' && <label htmlFor={label}>{label}</label>}
			</h3>
			{inputType === 'radio' && (
				<ul className='grid w-full gap-1.5'>
					{options.map((item) => (
						<li key={item}>
							<input
								type='radio'
								className='hidden peer'
								name={name}
								id={item}
								onClick={handleRadioChange}
								onChange={() => {}}
								value={item}
								checked={filterValue === item}
							/>
							<label
								htmlFor={item}
								className='inline-flex w-full py-1 px-2 border-2 rounded-md border-gray-700 text-gray-400 bg-gray-800 transition duration-100 ease-in-out hover:bg-gray-700 hover:text-gray-300 peer-checked:border-accent peer-checked:text-white cursor-pointer'>
								<div className='w-full text-sm font-semibold'>
									{capitalizeFirstLetter(item)}
								</div>
							</label>
						</li>
					))}
				</ul>
			)}
			{inputType === 'text' && (
				<input
					className='block w-full px-2 py-1 bg-transparent border-2 border-solid border-gray-700 rounded transition duration-100 ease-in-out focus:border-accent focus:outline-none'
					name={name}
					id={label}
					onKeyDown={(e) => {
						if (e.key === 'Enter') e.preventDefault();
					}}
					onChange={(e) => {
						if (name === 'size') {
							e.target.value = e.target.value.toUpperCase();
						}
						handleInputChange(e.target.name, e.target.value);
					}}
				/>
			)}
		</div>
	);
};

export default FilterSection;
