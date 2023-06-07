import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ClientForm from '../components/ClientForm';
import { useSelector } from 'react-redux';
import CONSTANT_LITERALS from '../Constants/Constants';

const UpdateClient = () => {
	const location = useLocation();
	const client = location.state;

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
				Update Client Information
			</h1>
			<ClientForm updateClient={client} />
		</div>
	);
};

export default UpdateClient;
