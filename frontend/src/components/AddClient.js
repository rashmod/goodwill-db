import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClientToDB } from '../features/ClientsSlice';
import useForm from '../hooks/useValidateForm';

const AddClient = () => {
	// * when saving to backend check property key
	// todo make file for data constants

	const dispatch = useDispatch();
	const { formState, valueChangeHandler, inputBlurHandler, resetForm } =
		useForm();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			addClientToDB({
				name: formState.clientName.value,
				mobile: formState.mobile.value,
				address: formState.address.value,
				propertyType: formState.propertyType.value,
				clientType: formState.clientType.value,
				rentParty: formState.rentParty.value,
				saleParty: formState.saleParty.value,
				loan: formState.loan.value,
				size: formState.size.value,
				sqft: formState.sqft.value,
				budget: formState.budget.value,
				lead: formState.lead.value,
				leadAgentName: formState.leadAgentName.value,
				leadOnlineName: formState.leadOnlineName.value,
			})
		);

		resetForm();
	};

	return (
		<div className='my-20 w-full'>
			<h1 className='text-center text-2xl sm:text-4xl font-bold mb-6'>
				Add Client Information
			</h1>
			<div className='p-6 rounded-lg min-w-[300px] sm:min-w-[500px] w-1/3 mx-auto bg-light-black shadow-[0_15px_25px_rgba(0,0,0,.6)] sm:text-xl'>
				<form action='' onSubmit={submitHandler}>
					<div className='mb-3 sm:mb-6'>
						<label
							htmlFor='client-name'
							className='inline-block mb-1 sm:mb-2'>
							Name
						</label>
						<input
							type='text'
							id='client-name'
							name='clientName'
							onChange={valueChangeHandler}
							onBlur={inputBlurHandler}
							value={formState.clientName.value}
							className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<div className='mb-3 sm:mb-6'>
						<label
							htmlFor='phone'
							className='inline-block mb-1 sm:mb-2'>
							Mobile
						</label>
						<input
							type='tel'
							id='phone'
							name='mobile'
							onChange={valueChangeHandler}
							onBlur={inputBlurHandler}
							value={formState.mobile.value}
							pattern='^[6-9]\d{9}$'
							className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<div className='mb-5 sm:mb-8'>
						<label
							htmlFor='address'
							className='inline-block mb-1 sm:mb-2'>
							Requirement Location
						</label>
						<input
							type='text'
							id='address'
							name='address'
							onChange={valueChangeHandler}
							onBlur={inputBlurHandler}
							value={formState.address.value}
							className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<div className='mb-3 sm:mb-6'>
						<select
							id='propertyType'
							name='propertyType'
							onChange={valueChangeHandler}
							onBlur={inputBlurHandler}
							value={formState.propertyType.value}
							className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
							<option value=''>Select property type</option>
							<option value='RESIDENTIAL'>Residential</option>
							<option value='COMMERCIAL'>Commercial</option>
							<option value='INDUSTRIAL'>Industrial</option>
							<option value='OPEN-PLOT'>Open Plot</option>
							<option value='AGRICULTURAL'>Agricultural</option>
						</select>
					</div>

					<ul
						className={
							'w-full grid gap-x-6 gap-y-2 grid-cols-2 ' +
							(formState.clientType.value === ''
								? 'mb-3 sm:mb-6'
								: 'mb-2')
						}>
						<p className='col-span-2'>Client Type</p>
						<li>
							<input
								type='radio'
								id='rent'
								name='clientType'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value='RENT'
								className='peer absolute opacity-0'
							/>
							<label
								htmlFor='rent'
								className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
								Rent
							</label>
						</li>
						<li>
							<input
								type='radio'
								id='sale'
								name='clientType'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value='SALE'
								className='peer absolute opacity-0'
							/>
							<label
								htmlFor='sale'
								className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
								Sale
							</label>
						</li>
					</ul>

					{formState.clientType.value === 'RENT' && (
						<ul className='grid w-full gap-6 grid-cols-2 mb-3 sm:mb-6'>
							<li>
								<input
									type='radio'
									id='renter'
									name='rentParty'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value='RENTER'
									checked={
										formState.rentParty.value === 'RENTER'
									}
									className='peer absolute opacity-0'
								/>
								<label
									htmlFor='renter'
									className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
									Renter
								</label>
							</li>
							<li>
								<input
									type='radio'
									id='homeowner'
									name='rentParty'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value='HOMEOWNER'
									checked={
										formState.rentParty.value ===
										'HOMEOWNER'
									}
									className='peer absolute opacity-0'
								/>
								<label
									htmlFor='homeowner'
									className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
									Homeowner
								</label>
							</li>
						</ul>
					)}

					{formState.clientType.value === 'SALE' && (
						<ul className='grid w-full gap-6 grid-cols-2 mb-3 sm:mb-6'>
							<li>
								<input
									type='radio'
									id='buyer'
									name='saleParty'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value='BUYER'
									checked={
										formState.saleParty.value === 'BUYER'
									}
									className='peer absolute opacity-0'
								/>
								<label
									htmlFor='buyer'
									className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
									Buyer
								</label>
							</li>
							<li>
								<input
									type='radio'
									id='Seller'
									name='saleParty'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value='SELLER'
									checked={
										formState.saleParty.value === 'SELLER'
									}
									className='peer absolute opacity-0'
								/>
								<label
									htmlFor='Seller'
									className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
									Seller
								</label>
							</li>
						</ul>
					)}

					<ul className='grid w-full gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 mb-3 sm:mb-6'>
						<li>
							<label htmlFor='size' className='inline-block mb-2'>
								Size
							</label>
							<input
								type='text'
								id='size'
								name='size'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={formState.size.value}
								className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
						</li>
						<li>
							<label
								htmlFor='sq-ft'
								className='inline-block mb-2'>
								Sq. Ft.
							</label>
							<input
								type='number'
								id='sq-ft'
								name='sqft'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={formState.sqft.value}
								className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
						</li>
					</ul>

					<ul className='grid w-full gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 mb-4 sm:mb-6'>
						<li
							className={
								formState.saleParty.value !== 'BUYER'
									? 'col-span-2'
									: ''
							}>
							<label
								htmlFor='budget'
								className='inline-block mb-2'>
								Budget
							</label>
							<input
								type='number'
								id='budget'
								name='budget'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={formState.budget.value}
								className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
						</li>
						{formState.saleParty.value === 'BUYER' && (
							<li className='flex items-end'>
								<select
									id='loan'
									name='loan'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									// value={formState.loan.value}
									className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
									<option value=''>Select Loan option</option>
									<option value='true'>Yes</option>
									<option value='false'>No</option>
								</select>
							</li>
						)}
					</ul>

					<ul className='grid w-full gap-x-4 sm:gap-x-6 grid-cols-1 sm:grid-cols-2 mb-6'>
						<li
							className={
								formState.lead.value === '' ||
								formState.lead.value === 'WALK-IN'
									? 'col-span-2'
									: ''
							}>
							<select
								id='lead'
								name='lead'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={formState.lead.value}
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								<option value=''>Select Lead option</option>
								<option value='WALK-IN'>Walk In</option>
								<option value='ONLINE'>Online</option>
								<option value='REFERENCE'>Reference</option>
							</select>
						</li>
						<li>
							{formState.lead.value === 'REFERENCE' && (
								<input
									type='text'
									name='leadAgentName'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value={formState.leadAgentName.value}
									placeholder='Agent Name'
									className='block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
								/>
							)}
							{formState.lead.value === 'ONLINE' && (
								<select
									id='lead-online'
									name='leadOnlineName'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value={formState.leadOnlineName.value}
									className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
									<option value=''>
										Select online option
									</option>
									<option value='UNKNOWN'>Unknown</option>
									<option value='JUST-DIAL'>Just dial</option>
									<option value='SQUARE-YARDS'>
										square yards
									</option>
								</select>
							)}
						</li>
					</ul>

					<button className='w-full bg-transparent border py-2 mt-6 transition ease-in-out hover:border-none hover:bg-accent'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

// check if the string is true or false
const isTrue = (str) => {
	if (str === 'true') return true;
	return false;
};

export default AddClient;
