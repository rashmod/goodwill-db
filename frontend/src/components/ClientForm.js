import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClientToDB, resetStatus } from '../features/ClientsSlice';
import useForm from '../hooks/useValidateForm';
import ErrorMessage from './ErrorMessage';
import CONSTANT_LITERALS from '../Constants/Constants';

const capitalizeFirstLetter = (str) => {
	const arr = str.split('-');

	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0) + arr[i].slice(1).toLowerCase();
	}

	return arr.join(' ');
};

const ClientForm = ({ updateClient }) => {
	// todo make file for data constants
	// todo show commas in budget input
	// todo unit in area input
	// todo prevent spaces in mobile field
	// todo display error msg when submit fails

	const [formIsValid, setFormIsValid] = useState(false);
	const addClientsStatus = useSelector(
		(state) => state.clients.addClientsStatus
	);

	const dispatch = useDispatch();
	const {
		formState,
		setFormState,
		valueChangeHandler,
		inputBlurHandler,
		resetForm,
	} = useForm();

	// reset form fields only on success
	useEffect(() => {
		if (addClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS) {
			resetForm();
		}
	}, [resetForm, addClientsStatus]);

	// reset add to db status on success or failure
	useEffect(() => {
		if (
			addClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS ||
			addClientsStatus === CONSTANT_LITERALS.STATUS.FAILURE
		) {
			setTimeout(() => {
				dispatch(resetStatus());
			}, 2000);
		}
	}, [dispatch, addClientsStatus]);

	const updateFunc = useCallback(() => {
		if (updateClient) {
			setFormState((prevState) => {
				return {
					clientName: {
						...prevState.clientName,
						value: updateClient.client.name,
					},
					mobile: {
						...prevState.mobile,
						value: updateClient.client.mobile,
					},
					address: {
						...prevState.address,
						value: updateClient.client.address,
					},
					propertyType: {
						...prevState.propertyType,
						value: updateClient.client.propertyType,
					},
					clientType: {
						...prevState.clientType,
						value: updateClient.client.clientType,
					},
					rentParty: {
						...prevState.rentParty,
						value: updateClient.client.rentParty,
					},
					saleParty: {
						...prevState.saleParty,
						value: updateClient.client.saleParty,
					},
					loan: {
						...prevState.loan,
						value: updateClient.client.loan,
					},
					size: {
						...prevState.size,
						value: updateClient.client.size,
					},
					sqft: {
						...prevState.sqft,
						value: updateClient.client.sqft,
					},
					budget: {
						...prevState.budget,
						value: updateClient.client.budget,
					},
					lead: {
						...prevState.lead,
						value: updateClient.client.lead,
					},
					leadAgentName: {
						...prevState.leadAgentName,
						value: updateClient.client.leadAgentName,
					},
					leadOnlineName: {
						...prevState.leadOnlineName,
						value: updateClient.client.leadOnlineName,
					},
				};
			});
		}
	}, [setFormState, updateClient]);

	useEffect(() => {
		updateFunc();
	}, [updateFunc]);

	const submitHandler = (e) => {
		e.preventDefault();

		for (const name in formState) {
			setFormState((prevState) => ({
				...prevState,
				[name]: { ...prevState[name], isTouched: true },
			}));
		}

		if (
			formState.clientName.hasError ||
			formState.mobile.hasError ||
			formState.address.hasError ||
			formState.propertyType.hasError ||
			formState.clientType.hasError ||
			formState.rentParty.hasError ||
			formState.saleParty.hasError ||
			formState.loan.hasError ||
			formState.size.hasError ||
			formState.sqft.hasError ||
			formState.budget.hasError ||
			formState.lead.hasError ||
			formState.leadAgentName.hasError ||
			formState.leadOnlineName.hasError
		) {
			return;
		} else {
			setFormIsValid(true);
		}

		if (formIsValid) {
			dispatch(
				addClientToDB({
					name: formState.clientName.value.trim(),
					mobile: formState.mobile.value,
					address: formState.address.value.trim(),
					propertyType: formState.propertyType.value,
					clientType: formState.clientType.value,
					rentParty: formState.rentParty.value,
					saleParty: formState.saleParty.value,
					loan: formState.loan.value,
					size: formState.size.value,
					sqft: formState.sqft.value,
					budget: formState.budget.value,
					lead: formState.lead.value,
					leadAgentName: formState.leadAgentName.value.trim(),
					leadOnlineName: formState.leadOnlineName.value,
				})
			);

			setFormIsValid(false);
		}
	};
	return (
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
						className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
							formState.clientName.hasError
								? 'border-red-400'
								: ''
						}`}
					/>
					{formState.clientName.hasError && (
						<ErrorMessage msg='Name is Required' />
					)}
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
						className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
							formState.mobile.hasError ? 'border-red-400' : ''
						}`}
					/>
					{formState.mobile.hasError && (
						<ErrorMessage msg='Mobile Number is Required' />
					)}
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
						className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
							formState.address.hasError ? 'border-red-400' : ''
						}`}
					/>
					{formState.address.hasError && (
						<ErrorMessage msg='Location is Required' />
					)}
				</div>

				<div className='mb-3 sm:mb-6'>
					<select
						id='propertyType'
						name='propertyType'
						onChange={valueChangeHandler}
						onBlur={inputBlurHandler}
						value={formState.propertyType.value}
						className={`bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none ${
							formState.propertyType.hasError
								? 'border border-red-400 '
								: ''
						}`}>
						<option value=''>Select property type</option>
						{Object.values(CONSTANT_LITERALS.PROPERTY_TYPE).map(
							(item) => (
								<option value={item} key={item}>
									{capitalizeFirstLetter(item)}
								</option>
							)
						)}
					</select>
					{formState.propertyType.hasError && (
						<ErrorMessage msg='Property Type is Required' />
					)}
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
							value={CONSTANT_LITERALS.CLIENT_TYPE.RENT}
							checked={
								formState.clientType.value ===
								CONSTANT_LITERALS.CLIENT_TYPE.RENT
							}
							className='peer absolute opacity-0'
						/>
						<label
							htmlFor='rent'
							className={`inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110 ${
								formState.clientType.hasError
									? 'border border-red-400 '
									: ''
							}`}>
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
							value={CONSTANT_LITERALS.CLIENT_TYPE.SALE}
							checked={
								formState.clientType.value ===
								CONSTANT_LITERALS.CLIENT_TYPE.SALE
							}
							className='peer absolute opacity-0'
						/>
						<label
							htmlFor='sale'
							className={`inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110 ${
								formState.clientType.hasError
									? 'border border-red-400 '
									: ''
							}`}>
							Sale
						</label>
					</li>
					{formState.clientType.hasError && (
						<ErrorMessage msg='Client Type is Required' />
					)}
				</ul>

				{formState.clientType.value ===
					CONSTANT_LITERALS.CLIENT_TYPE.RENT && (
					<ul className='grid w-full gap-x-6 grid-cols-2 mb-3 sm:mb-6'>
						<li>
							<input
								type='radio'
								id='renter'
								name='rentParty'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={CONSTANT_LITERALS.RENT_PARTY.RENTER}
								checked={
									formState.rentParty.value ===
									CONSTANT_LITERALS.RENT_PARTY.RENTER
								}
								className='peer absolute opacity-0'
							/>
							<label
								htmlFor='renter'
								className={`inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110 ${
									formState.rentParty.hasError
										? 'border border-red-400 '
										: ''
								}`}>
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
								value={CONSTANT_LITERALS.RENT_PARTY.HOMEOWNER}
								checked={
									formState.rentParty.value ===
									CONSTANT_LITERALS.RENT_PARTY.HOMEOWNER
								}
								className='peer absolute opacity-0'
							/>
							<label
								htmlFor='homeowner'
								className={`inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110 ${
									formState.rentParty.hasError
										? 'border border-red-400 '
										: ''
								}`}>
								Homeowner
							</label>
						</li>
						{formState.rentParty.hasError && (
							<ErrorMessage msg='Rent Party is Required' />
						)}
					</ul>
				)}

				{formState.clientType.value ===
					CONSTANT_LITERALS.CLIENT_TYPE.SALE && (
					<ul className='grid w-full gap-x-6 grid-cols-2 mb-3 sm:mb-6'>
						<li>
							<input
								type='radio'
								id='buyer'
								name='saleParty'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={CONSTANT_LITERALS.SALE_PARTY.BUYER}
								checked={
									formState.saleParty.value ===
									CONSTANT_LITERALS.SALE_PARTY.BUYER
								}
								className='peer absolute opacity-0'
							/>
							<label
								htmlFor='buyer'
								className={`inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110 ${
									formState.saleParty.hasError
										? 'border border-red-400 '
										: ''
								}`}>
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
								value={CONSTANT_LITERALS.SALE_PARTY.SELLER}
								checked={
									formState.saleParty.value ===
									CONSTANT_LITERALS.SALE_PARTY.SELLER
								}
								className='peer absolute opacity-0'
							/>
							<label
								htmlFor='Seller'
								className={`inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110 ${
									formState.saleParty.hasError
										? 'border border-red-400 '
										: ''
								}`}>
								Seller
							</label>
						</li>
						{formState.saleParty.hasError && (
							<ErrorMessage msg='Sale Party is Required' />
						)}
					</ul>
				)}

				<ul className='grid w-full gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 mb-3 sm:mb-6'>
					<li>
						<label htmlFor='size' className='inline-block mb-2'>
							Type
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
							className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
								formState.size.hasError ? 'border-red-400' : ''
							}`}
						/>
						{formState.size.hasError && (
							<ErrorMessage msg='Type is Required' />
						)}
					</li>
					<li>
						<label htmlFor='sq-ft' className='inline-block mb-2'>
							Area
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
							min='0'
							className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
								formState.sqft.hasError ? 'border-red-400' : ''
							}`}
						/>
						{formState.sqft.hasError && (
							<ErrorMessage msg='Area is Required' />
						)}
					</li>
				</ul>

				<ul className='grid w-full gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 mb-4 sm:mb-6'>
					<li
						className={
							formState.saleParty.value !==
							CONSTANT_LITERALS.SALE_PARTY.BUYER
								? 'col-span-2'
								: ''
						}>
						<label htmlFor='budget' className='inline-block mb-2'>
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
							min='0'
							className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
								formState.budget.hasError
									? 'border-red-400'
									: ''
							}`}
						/>
						{formState.budget.hasError && (
							<ErrorMessage msg='Budget is Required' />
						)}
					</li>
					{formState.saleParty.value ===
						CONSTANT_LITERALS.SALE_PARTY.BUYER && (
						<li
							className={`flex ${
								formState.budget.hasError
									? 'items-center mt-3'
									: 'items-end'
							}`}>
							<select
								id='loan'
								name='loan'
								onChange={(e) => {
									valueChangeHandler(e);
								}}
								onBlur={inputBlurHandler}
								value={formState.loan.value.toString()}
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								{/* <option value=''>Select Loan option</option> */}
								<option
									value='true'
									// selected={formState.loan.value === true}
								>
									Loan: Yes
								</option>
								<option
									value='false'
									// selected={formState.loan.value === false}
								>
									Loan: No
								</option>
							</select>
							{formState.loan.hasError && (
								<ErrorMessage msg='Loan is Required' />
							)}
						</li>
					)}
				</ul>

				<ul className='grid w-full gap-x-4 sm:gap-x-6 grid-cols-1 sm:grid-cols-2 mb-6'>
					<li
						className={
							formState.lead.value === '' ||
							formState.lead.value ===
								CONSTANT_LITERALS.LEAD.WALK_IN
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
							className={`bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none ${
								formState.lead.hasError
									? 'border border-red-400 '
									: ''
							}`}>
							<option value=''>Select Lead option</option>
							{Object.values(CONSTANT_LITERALS.LEAD).map(
								(item) => (
									<option value={item} key={item}>
										{capitalizeFirstLetter(item)}
									</option>
								)
							)}
						</select>
						{formState.lead.hasError && (
							<ErrorMessage msg='Lead is Required' />
						)}
					</li>
					<li>
						{formState.lead.value ===
							CONSTANT_LITERALS.LEAD.REFERENCE && (
							<>
								<input
									type='text'
									name='leadAgentName'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value={formState.leadAgentName.value}
									placeholder='Agent Name'
									className={`block w-full px-3 py-1.5 bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none ${
										formState.leadAgentName.hasError
											? 'border-red-400 '
											: ''
									}`}
								/>
								{formState.leadAgentName.hasError && (
									<ErrorMessage msg='Agent Name is Required' />
								)}
							</>
						)}
						{formState.lead.value ===
							CONSTANT_LITERALS.LEAD.ONLINE && (
							<>
								<select
									id='lead-online'
									name='leadOnlineName'
									onChange={(e) => {
										valueChangeHandler(e);
									}}
									onBlur={inputBlurHandler}
									value={formState.leadOnlineName.value}
									className={`bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none ${
										formState.leadOnlineName.hasError
											? 'border border-red-400 '
											: ''
									}`}>
									<option value=''>
										Select online option
									</option>
									{Object.values(
										CONSTANT_LITERALS.LEAD_ONLINE_NAME
									).map((item) => (
										<option value={item} key={item}>
											{capitalizeFirstLetter(item)}
										</option>
									))}
								</select>
								{formState.leadOnlineName.hasError && (
									<ErrorMessage msg='Online Name is Required' />
								)}
							</>
						)}
					</li>
				</ul>

				{addClientsStatus === '' ? (
					<button className='w-full bg-transparent border py-2 mt-6 transition ease-in-out hover:border-none hover:bg-accent'>
						Submit
					</button>
				) : addClientsStatus === CONSTANT_LITERALS.STATUS.LOADING ? (
					<button
						disabled
						type='button'
						className='w-full py-2 mt-12 bg-accent mr-2 flex justify-center'>
						<div className='inline-flex items-center'>
							<svg
								aria-hidden='true'
								role='status'
								className='inline w-4 h-4 mr-3 text-white animate-spin'
								viewBox='0 0 100 101'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
									fill='#E5E7EB'
								/>
								<path
									d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
									fill='currentColor'
								/>
							</svg>
							<span>Loading...</span>
						</div>
					</button>
				) : addClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS ? (
					<button
						disabled
						className='w-full py-2 mt-12 bg-accent mr-2 flex justify-center'>
						Successfully Added!
					</button>
				) : addClientsStatus === CONSTANT_LITERALS.STATUS.FAILURE ? (
					<button
						disabled
						className='w-full py-2 mt-12 bg-red-400 mr-2 flex justify-center'>
						Failed!
					</button>
				) : null}
			</form>
		</div>
	);
};

export default ClientForm;
