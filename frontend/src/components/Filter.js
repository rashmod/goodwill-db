import React from 'react';
import CONSTANT_LITERALS from '../Constants/Constants';
import FilterSection from './FilterSection';

const Filter = () => {
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

			{/* 108 */}
			<FilterSection
				label='Client Type'
				options={Object.values(CONSTANT_LITERALS.CLIENT_TYPE)}
				name='clientType'
			/>

			<div className='grid gap-2'>
				<FilterSection
					label='Rent Party'
					options={Object.values(CONSTANT_LITERALS.RENT_PARTY)}
					name='rentParty'
				/>

				<FilterSection
					label='Sale Party'
					options={Object.values(CONSTANT_LITERALS.SALE_PARTY)}
					name='saleParty'
				/>
			</div>

			<div className='grid gap-2'>
				<FilterSection
					label='Lead'
					options={Object.values(CONSTANT_LITERALS.LEAD)}
					name='lead'
				/>

				<FilterSection
					label='Lead Agent Name'
					name='leadAgentName'
					inputType='text'
				/>
			</div>

			<FilterSection
				label='Lead Online Name'
				options={Object.values(CONSTANT_LITERALS.LEAD_ONLINE_NAME)}
				name='leadOnlineName'
			/>
		</div>
	);
};

export default Filter;
