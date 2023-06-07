import React from 'react';
import { useSelector } from 'react-redux';
import CONSTANT_LITERALS from '../Constants/Constants';
import { Navigate, useLocation } from 'react-router-dom';

const SignUp = () => {
	const handleSignIn = () => {
		window.open(
			`${process.env.REACT_APP_BASEURL}/auth/google/callback`,
			'_self'
		);
	};

	const { state } = useLocation();

	const user = useSelector((state) => state.user);
	const isSignedIn =
		user.isLoggedIn &&
		user.id.length > 0 &&
		user.status === CONSTANT_LITERALS.STATUS.SUCCESS &&
		user.error === '';

	if (isSignedIn) {
		return <Navigate to='/' replace={true} />;
	}

	return (
		<div className='h-96 flex flex-col items-center justify-center'>
			{state && (
				<div
					className='flex items-center p-4 mb-12 text-sm rounded-lg bg-light-black text-red-400'
					role='alert'>
					<svg
						aria-hidden='true'
						className='flex-shrink-0 inline w-5 h-5 mr-3'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
							clipRule='evenodd'
						/>
					</svg>
					<span className='sr-only'>Info</span>
					<div className='text-base'>
						<span className='font-medium mr-2'>{state.error}</span>
						{state.msg}
					</div>
				</div>
			)}

			<button
				onClick={handleSignIn}
				className='px-4 py-2 border-2 flex items-center gap-2 border-slate-200 rounded-lg hover:border-accent hover:bg-accent/30  transition duration-150'>
				<svg
					className='mr-2 -ml-1 w-6 h-6'
					aria-hidden='true'
					focusable='false'
					data-prefix='fab'
					data-icon='google'
					role='img'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 488 512'>
					<path
						fill='currentColor'
						d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
				</svg>
				<span>Login with Google</span>
			</button>
		</div>
	);
};

export default SignUp;
