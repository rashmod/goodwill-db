import React from 'react';
import CONSTANT_LITERALS from '../Constants/Constants';
import FilterSection from './FilterSection';
import RangeSlider from './RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../features/FiltersSlice';
import { fetchClients } from '../features/ClientsSlice';
import removeEmpty from '../utilities/removeEmpty';

const Filter = ({ setShowFilter, setIsFilterActive }) => {
	const dispatch = useDispatch();

	const filters = useSelector((state) => state.filters);

	const applyHandler = () => {
		if (Object.keys(removeEmpty(filters)).length === 0) {
			setIsFilterActive(false);
		} else {
			setIsFilterActive(true);
		}
		setShowFilter(false);
		dispatch(fetchClients(removeEmpty(filters)));
	};

	const clearHandler = () => dispatch(resetFilter());

	const closeHandler = () => setShowFilter(false);

	return (
		<div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm mt-6 bg-light-black p-3 rounded-md'>
			{/* 228 */}
			<FilterSection
				label='Property Type'
				options={Object.values(CONSTANT_LITERALS.PROPERTY_TYPE)}
				name='propertyType'
			/>

			<div className='grid gap-2'>
				{/* 148 */}
				<FilterSection
					label='Deal Status'
					options={Object.values(CONSTANT_LITERALS.DEAL_STATUS)}
					name='dealStatus'
				/>

				{/* 68 */}
				<FilterSection
					label='Property Size'
					name='size'
					inputType='text'
				/>
			</div>

			<div className='grid gap-2'>
				<RangeSlider label='Area' min={0} max={5000} step={50} />
				{filters.clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT && (
					<RangeSlider
						label='Budget'
						min={0}
						max={300000}
						step={5000}
					/>
				)}
				{filters.clientType === CONSTANT_LITERALS.CLIENT_TYPE.SALE && (
					<RangeSlider
						label='Budget'
						min={0}
						max={100000000}
						step={500000}
					/>
				)}
			</div>

			{/* 108 */}
			<div className='grid gap-2'>
				<FilterSection
					label='Client Type'
					options={Object.values(CONSTANT_LITERALS.CLIENT_TYPE)}
					name='clientType'
				/>

				{filters.clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT && (
					<FilterSection
						label='Rent Party'
						options={Object.values(CONSTANT_LITERALS.RENT_PARTY)}
						name='rentParty'
					/>
				)}

				{filters.clientType === CONSTANT_LITERALS.CLIENT_TYPE.SALE && (
					<FilterSection
						label='Sale Party'
						options={Object.values(CONSTANT_LITERALS.SALE_PARTY)}
						name='saleParty'
					/>
				)}
			</div>

			<div className='grid gap-2'>
				<FilterSection
					label='Lead'
					options={Object.values(CONSTANT_LITERALS.LEAD)}
					name='lead'
				/>

				{filters.lead === CONSTANT_LITERALS.LEAD.REFERENCE && (
					<FilterSection
						label='Lead Agent Name'
						name='leadAgentName'
						inputType='text'
					/>
				)}
			</div>

			{filters.lead === CONSTANT_LITERALS.LEAD.ONLINE && (
				<FilterSection
					label='Lead Online Name'
					options={Object.values(CONSTANT_LITERALS.LEAD_ONLINE_NAME)}
					name='leadOnlineName'
				/>
			)}

			<div className='flex flex-col gap-2 col-end-[-1] self-center mt-2'>
				<button
					onClick={applyHandler}
					type='submit'
					className='w-full max-h-10 bg-accent/75 rounded py-2 transition ease-in-out hover:border-accent hover:bg-accent'>
					Apply
				</button>
				<button
					type='button'
					className='w-full max-h-10 rounded py-2 bg-red-500/75 hover:bg-red-400'
					onClick={clearHandler}>
					Clear
				</button>
				<button
					type='button'
					className='w-full max-h-10 rounded py-2 border hover:bg-light-black'
					onClick={closeHandler}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Filter;
