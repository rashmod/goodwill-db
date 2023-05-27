import React from 'react';

const SuccessButton = ({ msg }) => {
	return (
		<button
			disabled
			className='w-full py-2 mt-12 bg-accent mr-2 flex justify-center'>
			Successfully {msg}!
		</button>
	);
};

export default SuccessButton;
