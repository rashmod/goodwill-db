import React, { useState } from 'react';

const AddClient = () => {
	// * when saving to backend check property key

	const [formData, setFormData] = useState({
		clientName: '',
		mobile: '',
		address: '',
		clientType: '',
		rentParty: '',
		saleParty: '',
		loan: false,
		size: '',
		sqft: 0,
		budget: 0,
		lead: '',
		leadAgentName: '',
		leadOnlineName: '',
	});

	const submitHandler = (e) => {
		e.preventDefault();
	};

	const handleInputChange = (e) => {
		// if the input name is mobile and the input is anything other than number return
		// turn input into and check if NaN
		if (e.target.name === 'mobile' && isNaN(+e.target.value)) {
			return;
		} else if (e.target.name === 'loan') {
			setFormData({
				...formData,
				[e.target.name]: isTrue(e.target.value),
			});
		} else if (e.target.name === 'sqft' || e.target.name === 'budget') {
			// if the input is 0 let it be ''
			if (!Boolean(Number(e.target.value))) {
				setFormData({
					...formData,
					[e.target.name]: '',
				});
			} else {
				setFormData({
					...formData,
					[e.target.name]: Number(e.target.value),
				});
			}
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	return (
		<div className='my-20 w-full'>
			<h1 className='text-center text-4xl font-bold mb-6'>
				Add Client Information
			</h1>
			<div className='p-6 rounded-lg min-w-[500px] w-1/3 mx-auto bg-light-black shadow-[0_15px_25px_rgba(0,0,0,.6)] text-xl'>
				<form action='' onSubmit={submitHandler}>
					<div className='mb-6'>
						<label
							htmlFor='client-name'
							className='inline-block mb-2'>
							Name
						</label>
						<input
							type='text'
							id='client-name'
							name='clientName'
							onChange={handleInputChange}
							value={formData.clientName}
							className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<div className='mb-6'>
						<label htmlFor='phone' className='inline-block mb-2'>
							Mobile
						</label>
						<input
							type='tel'
							id='phone'
							name='mobile'
							onChange={handleInputChange}
							value={formData.mobile}
							pattern='^[6-9]\d{9}$'
							className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<div className='mb-6'>
						<label htmlFor='address' className='inline-block mb-2'>
							Address
						</label>
						<input
							type='text'
							id='address'
							name='address'
							onChange={handleInputChange}
							value={formData.address}
							className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<ul className='grid w-full gap-6 grid-cols-2 mb-2'>
						<li>
							<input
								type='radio'
								id='rent'
								name='clientType'
								onChange={handleInputChange}
								value='RENT'
								className='peer hidden'
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
								onChange={handleInputChange}
								value='SALE'
								className='peer hidden'
							/>
							<label
								htmlFor='sale'
								className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
								Sale
							</label>
						</li>
					</ul>

					<ul className='grid w-full gap-6 grid-cols-2 mb-6'>
						<li>
							<input
								type='radio'
								id='renter'
								name='rentParty'
								onChange={handleInputChange}
								value='RENTER'
								className='peer hidden'
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
								onChange={handleInputChange}
								value='HOMEOWNER'
								className='peer hidden'
							/>
							<label
								htmlFor='homeowner'
								className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
								Homeowner
							</label>
						</li>
					</ul>

					<ul className='grid w-full gap-6 grid-cols-2 mb-6'>
						<li>
							<input
								type='radio'
								id='buyer'
								name='saleParty'
								onChange={handleInputChange}
								value='BUYER'
								className='peer hidden'
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
								onChange={handleInputChange}
								value='SELLER'
								className='peer hidden'
							/>
							<label
								htmlFor='Seller'
								className='inline-flex w-full py-2 px-4 bg-[#243b55] rounded cursor-pointer transition ease-in-out peer-checked:bg-accent  hover:bg-opacity-50 peer-checked:hover:brightness-110'>
								Seller
							</label>
						</li>
					</ul>

					<ul className='grid w-full gap-6 grid-cols-2 mb-6'>
						<li>
							<label htmlFor='size'>Size</label>
							<input
								type='text'
								id='size'
								name='size'
								onChange={handleInputChange}
								value={formData.size}
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
						</li>
						<li>
							<label htmlFor='sq-ft'>Sq. Ft.</label>
							<input
								type='number'
								id='sq-ft'
								name='sqft'
								onChange={handleInputChange}
								value={formData.sqft}
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
						</li>
					</ul>

					<ul className='grid w-full gap-6 grid-cols-2 mb-6'>
						<li className='col-span-2'>
							<label
								htmlFor='budget'
								className='inline-block mb-2'>
								Budget
							</label>
							<input
								type='number'
								id='budget'
								name='budget'
								onChange={handleInputChange}
								value={formData.budget}
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
						</li>
						{/* when client is buyer then show this */}
						<li className='flex items-end'>
							<select
								id='loan'
								name='loan'
								onChange={handleInputChange}
								// value={formData.loan}
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								<option value=''>Select Loan option</option>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</li>
					</ul>

					<ul className='grid w-full gap-6 grid-cols-2 mb-6'>
						<li>
							<select
								id='lead'
								name='lead'
								onChange={handleInputChange}
								value={formData.lead}
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								<option value=''>Select Lead option</option>
								<option value='WALK-IN'>Walk In</option>
								<option value='ONLINE'>Online</option>
								<option value='REFERENCE'>Reference</option>
							</select>
						</li>
						<li>
							<input
								type='text'
								name='leadAgentName'
								onChange={handleInputChange}
								value={formData.leadAgentName}
								placeholder='Agent Name'
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/>
							<select
								id='lead-online'
								name='leadOnlineName'
								onChange={handleInputChange}
								value={formData.leadOnlineName}
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								<option value=''>Select online option</option>
								<option value='UNKNOWN'>Unknown</option>
								<option value='JUST-DIAL'>Just dial</option>
								<option value='SQUARE-YARDS'>
									square yards
								</option>
							</select>
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
