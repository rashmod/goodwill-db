import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	addClientToDB,
	updateClientToDB,
	resetStatus,
} from '../features/ClientsSlice';
import useForm from '../hooks/useValidateForm';
import ErrorMessage from './ErrorMessage';
import CONSTANT_LITERALS from '../Constants/Constants';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter';
import SuccessButton from '../UI/SuccessButton';
import LoadingButton from '../UI/LoadingButton';
import SubmitButton from '../UI/SubmitButton';
import FailureButton from '../UI/FailureButton';

const ClientForm = ({ updateClient }) => {
	// todo unit in area input
	// todo display error msg when submit fails
	// todo budget field resets the caret position on editing the field

	const { pathname, state: locationState } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formIsValid, setFormIsValid] = useState(false);
	const { addClientsStatus, updateClientsStatus } = useSelector(
		(state) => state.clients
	);

	const {
		formState,
		setFormState,
		valueChangeHandler,
		inputBlurHandler,
		resetForm,
	} = useForm();

	useEffect(() => {
		if (
			pathname === '/updateClient' &&
			updateClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS
		) {
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 500);
		}
	}, [updateClientsStatus, pathname, navigate]);

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
			addClientsStatus === CONSTANT_LITERALS.STATUS.FAILURE ||
			updateClientsStatus === CONSTANT_LITERALS.STATUS.SUCCESS ||
			updateClientsStatus === CONSTANT_LITERALS.STATUS.FAILURE
		) {
			setTimeout(() => {
				dispatch(resetStatus());
			}, 2000);
		}
	}, [dispatch, addClientsStatus, updateClientsStatus]);

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
			const clientData = {
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
			};

			if (pathname === '/updateClient') {
				dispatch(
					updateClientToDB({
						clientId: locationState.client._id,
						clientData,
					})
				);
			} else {
				dispatch(addClientToDB(clientData));
			}

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
							value={Number(formState.sqft.value).toString()}
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
							type='text'
							id='budget'
							name='budget'
							onChange={(e) => {
								valueChangeHandler(e);
							}}
							onBlur={inputBlurHandler}
							value={formState.budget.value.toLocaleString(
								'en-IN'
							)}
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

				{pathname !== '/updateClient' &&
					(addClientsStatus === '' ? (
						<SubmitButton />
					) : addClientsStatus ===
					  CONSTANT_LITERALS.STATUS.LOADING ? (
						<LoadingButton />
					) : addClientsStatus ===
					  CONSTANT_LITERALS.STATUS.SUCCESS ? (
						<SuccessButton msg='Added' />
					) : addClientsStatus ===
					  CONSTANT_LITERALS.STATUS.FAILURE ? (
						<FailureButton />
					) : null)}

				{pathname === '/updateClient' &&
					(updateClientsStatus === '' ? (
						<SubmitButton />
					) : updateClientsStatus ===
					  CONSTANT_LITERALS.STATUS.LOADING ? (
						<LoadingButton />
					) : updateClientsStatus ===
					  CONSTANT_LITERALS.STATUS.SUCCESS ? (
						<SuccessButton msg='Updated' />
					) : updateClientsStatus ===
					  CONSTANT_LITERALS.STATUS.FAILURE ? (
						<FailureButton />
					) : null)}
			</form>
		</div>
	);
};

export default ClientForm;
