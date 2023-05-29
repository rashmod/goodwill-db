import React from 'react';

const CollapseButton = ({ setExpandedCard }) => {
	return (
		<button
			className='h-10 w-10'
			onClick={() => {
				setExpandedCard(null);
			}}>
			<svg
				id='Icons'
				version='1.1'
				viewBox='0 0 32 32'
				className='fill-[#BFC0C0]/50 hover:fill-[#BFC0C0]'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M21.7,18.7C21.5,18.9,21.3,19,21,19s-0.5-0.1-0.7-0.3  L16,14.4l-4.3,4.3c-0.4,0.4-1,0.4-1.4,0s-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0l5,5C22.1,17.7,22.1,18.3,21.7,18.7z' />
			</svg>
		</button>
	);
};

export default CollapseButton;
