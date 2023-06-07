import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userSignOut } from '../features/UserSlice';
import CONSTANT_LITERALS from '../Constants/Constants';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const isSignedIn =
		user.isLoggedIn &&
		user.id.length > 0 &&
		user.status === CONSTANT_LITERALS.STATUS.SUCCESS &&
		user.error === '';

	return (
		<nav className='flex justify-between container text-sm sm:text-base py-4 px-4 sm:px-0 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto'>
			<span>Goodwill DB</span>
			<ul className='flex gap-6 sm:gap-16'>
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'underline underline-offset-4' : ''
						}
						to='/'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'underline underline-offset-4' : ''
						}
						to='/addClient'>
						Add Client
					</NavLink>
				</li>
				{isSignedIn ? (
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'underline underline-offset-4' : ''
							}
							onClick={() => dispatch(userSignOut())}
							to='/signup'>
							Sign Out
						</NavLink>
					</li>
				) : (
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'underline underline-offset-4' : ''
							}
							to='/signup'>
							Sign Up
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
