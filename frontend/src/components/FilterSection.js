import React from 'react';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';

const FilterSection = ({ label, options, name, inputType = 'checkbox' }) => {
	return (
		<div>
			<h3 className='mb-2 font-medium text-base'>
				{inputType === 'checkbox' && label}
				{inputType === 'text' && <label htmlFor={label}>{label}</label>}
			</h3>
			{inputType === 'checkbox' && (
				<ul className='grid w-full gap-1.5'>
					{options.map((item) => (
						<li key={item}>
							<input
								type='checkbox'
								className='hidden peer'
								name={name}
								id={item}
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
				/>
			)}
		</div>
	);
};

export default FilterSection;
