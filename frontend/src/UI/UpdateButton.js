import React from 'react';
import { Link } from 'react-router-dom';

const UpdateButton = ({ client }) => {
	return (
		<Link
			className='bg-accent/75 py-1 px-2 rounded-md hover:bg-accent'
			to='/updateClient'
			state={{ client }}>
			<span className='inline-block align-middle'>Update</span>
		</Link>
	);
};

export default UpdateButton;
