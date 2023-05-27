import React from 'react';

const FailureButton = () => {
	return (
		<button
			disabled
			className='w-full py-2 mt-12 bg-red-400 mr-2 flex justify-center'>
			Failed!
		</button>
	);
};

export default FailureButton;
