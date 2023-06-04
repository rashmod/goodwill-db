import React from 'react';
import { useDispatch } from 'react-redux';
import { resetFilter } from '../features/FiltersSlice';
import NotFoundEmojiSVG from '../assets/svg/NotFoundEmojiSVG';

const ClientNotFound = ({ setIsFilterActive }) => {
	const dispatch = useDispatch();

	return (
		<section className='flex items-center w-full'>
			<div className='container flex flex-col items-center justify-center px-5 mx-auto mt-4 mb-8'>
				<div className='container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md'>
					<NotFoundEmojiSVG />
					<p className='text-2xl font-semibold md:text-3xl'>
						Sorry, we couldn't find a Client with that requirements.
					</p>
					<p className='mt-4 mb-8text-gray-400'>
						But don't worry, you can find plenty of other Clients on
						the homepage.
					</p>
					<button
						className='px-8 py-3 font-semibold rounded bg-accent/75 hover:bg-accent'
						onClick={() => {
							dispatch(resetFilter());
							setIsFilterActive(false);
						}}>
						Back to homepage
					</button>
				</div>
			</div>
		</section>
	);
};

export default ClientNotFound;
