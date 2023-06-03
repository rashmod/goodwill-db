import React, { useState } from 'react';
import CONSTANT_LITERALS from '../Constants/Constants';
import FilterSection from './FilterSection';
import RangeSlider from './RangeSlider';

const initialFilterState = {
	propertyType: '',
	dealStatus: '',
	clientType: '',
	rentParty: '',
	saleParty: '',
	size: '',
	lead: '',
	leadOnlineName: '',
	leadAgentName: '',
	minBudget: 0,
	maxBudget: 0,
	minArea: 0,
	maxArea: 0,
};

const Filter = ({ setShowFilter }) => {
	const [filter, setFilter] = useState(initialFilterState);

	return (
		<div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm mt-6 bg-light-black p-3 rounded-md'>
			{/* 228 */}
			<FilterSection
				label='Property Type'
				options={Object.values(CONSTANT_LITERALS.PROPERTY_TYPE)}
				name='propertyType'
				setFilter={setFilter}
				filter={filter}
			/>

			<div className='grid gap-2'>
				{/* 148 */}
				<FilterSection
					label='Deal Status'
					options={Object.values(CONSTANT_LITERALS.DEAL_STATUS)}
					name='dealStatus'
					setFilter={setFilter}
					filter={filter}
				/>

				{/* 68 */}
				<FilterSection
					label='Property Size'
					name='size'
					inputType='text'
					setFilter={setFilter}
					filter={filter}
				/>
			</div>

			<div className='grid gap-2'>
				<RangeSlider
					label='Area'
					min={250}
					max={3000}
					step={50}
					setFilter={setFilter}
				/>
				{filter.clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT && (
					<RangeSlider
						label='Budget'
						min={10000}
						max={200000}
						step={1000}
						setFilter={setFilter}
					/>
				)}
				{filter.clientType === CONSTANT_LITERALS.CLIENT_TYPE.SALE && (
					<RangeSlider
						label='Budget'
						min={3000000}
						max={100000000}
						step={100000}
						setFilter={setFilter}
					/>
				)}
			</div>

			{/* 108 */}
			<div className='grid gap-2'>
				<FilterSection
					label='Client Type'
					options={Object.values(CONSTANT_LITERALS.CLIENT_TYPE)}
					name='clientType'
					setFilter={setFilter}
					filter={filter}
				/>

				{filter.clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT && (
					<FilterSection
						label='Rent Party'
						options={Object.values(CONSTANT_LITERALS.RENT_PARTY)}
						name='rentParty'
						setFilter={setFilter}
						filter={filter}
					/>
				)}

				{filter.clientType === CONSTANT_LITERALS.CLIENT_TYPE.SALE && (
					<FilterSection
						label='Sale Party'
						options={Object.values(CONSTANT_LITERALS.SALE_PARTY)}
						name='saleParty'
						setFilter={setFilter}
						filter={filter}
					/>
				)}
			</div>

			<div className='grid gap-2'>
				<FilterSection
					label='Lead'
					options={Object.values(CONSTANT_LITERALS.LEAD)}
					name='lead'
					setFilter={setFilter}
					filter={filter}
				/>

				{filter.lead === CONSTANT_LITERALS.LEAD.REFERENCE && (
					<FilterSection
						label='Lead Agent Name'
						name='leadAgentName'
						inputType='text'
						setFilter={setFilter}
						filter={filter}
					/>
				)}
			</div>

			{filter.lead === CONSTANT_LITERALS.LEAD.ONLINE && (
				<FilterSection
					label='Lead Online Name'
					options={Object.values(CONSTANT_LITERALS.LEAD_ONLINE_NAME)}
					name='leadOnlineName'
					setFilter={setFilter}
					filter={filter}
				/>
			)}

			<div className='flex flex-col gap-2 col-end-[-1] self-center mt-2'>
				<button
					onClick={() => setShowFilter(false)}
					type='submit'
					className='w-full max-h-10 bg-accent/75 rounded py-2 transition ease-in-out hover:border-accent hover:bg-accent'>
					Apply
				</button>
				<button
					type='button'
					className='w-full max-h-10 rounded py-2 bg-red-500/75 hover:bg-red-400'
					onClick={() => setFilter(initialFilterState)}>
					Clear
				</button>
				<button
					type='button'
					className='w-full max-h-10 rounded py-2 border hover:bg-light-black'
					onClick={() => setShowFilter(false)}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Filter;
