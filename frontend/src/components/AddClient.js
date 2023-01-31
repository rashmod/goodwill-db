import React from 'react';

const AddClient = () => {
	return (
		<div className='my-20 w-full'>
			<h1 className='text-center text-4xl font-bold mb-6'>
				Add Client Information
			</h1>
			<div className='p-6 rounded-lg min-w-[500px] w-1/3 mx-auto bg-light-black shadow-[0_15px_25px_rgba(0,0,0,.6)] text-xl'>
				<form action=''>
					<div className='mb-6'>
						<label
							htmlFor='client-name'
							className='inline-block mb-2'>
							Name
						</label>
						<input
							type='text'
							id='client-name'
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
							pattern='[0-9]{10}'
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
							className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<ul className='grid w-full gap-6 grid-cols-2 mb-2'>
						<li>
							<input
								type='radio'
								value='rent'
								name='type'
								id='rent'
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
								value='sale'
								name='type'
								id='sale'
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
								value='renter'
								name='rent'
								id='renter'
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
								value='homeowner'
								name='rent'
								id='homeowner'
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
								value='buyer'
								name='sale'
								id='buyer'
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
								value='Seller'
								name='sale'
								id='Seller'
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
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
								id='size'
							/>
						</li>
						<li>
							<label htmlFor='sq-ft'>Sq. Ft.</label>
							<input
								type='text'
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
								id='sq-ft'
							/>
						</li>
					</ul>

					<div className='mb-6'>
						<label htmlFor='budget' className='inline-block mb-2'>
							Budget
						</label>
						<input
							type='number'
							id='budget'
							className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
						/>
					</div>

					<ul className='grid w-full gap-6 grid-cols-2 mb-6'>
						<li>
							<select
								name='lead'
								id='lead'
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								<option selected>Select Lead option</option>
								<option value='walk-in'>Walk In</option>
								<option value='online'>Online</option>
								<option value='reference'>Reference</option>
							</select>
						</li>
						<li>
							{/* <input
								type='text'
								placeholder='Agent Name'
								className='block w-full px-3 py-1.5 text-l bg-transparent border border-solid border-gray-300 rounded transition ease-in-out focus:border-accent focus:outline-none'
							/> */}
							<select
								name='lead'
								id='lead'
								className='bg-[#243b55] rounded w-full px-3 py-1.5 focus:border-none'>
								<option selected>Select online option</option>
								<option value='unknown'>Unknown</option>
								<option value='justdial'>Just dial</option>
								<option value='square-yards'>
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

export default AddClient;
