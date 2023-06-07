import React from 'react';
import ClientForm from '../components/ClientForm';
import { useSelector } from 'react-redux';
import CONSTANT_LITERALS from '../Constants/Constants';
import { Navigate } from 'react-router-dom';

const AddClient = () => {
	const user = useSelector((state) => state.user);
	const isSignedIn =
		user.isLoggedIn &&
		user.id.length > 0 &&
		user.status === CONSTANT_LITERALS.STATUS.SUCCESS &&
		user.error === '';

	if (!isSignedIn) {
		return (
			<Navigate
				to='/signup'
				replace={true}
				state={{ error: 'Access Restricted:', msg: 'Please Log In' }}
			/>
		);
	}

	return (
		<div className='my-20 w-full'>
			<h1 className='text-center text-2xl sm:text-4xl font-bold mb-6'>
				Add Client Information
			</h1>
			<ClientForm />
		</div>
	);
};

export default AddClient;
