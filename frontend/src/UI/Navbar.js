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
		<nav className='flex justify-between items-center container text-sm sm:text-base py-4 px-4 sm:px-0 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto'>
			<span>Goodwill DB</span>
			<ul className='flex items-center gap-6 sm:gap-16'>
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
					<li className='group relative py-1 px-5 rounded-md border-2 border-slate-400 hover:bg-accent/30 hover:border-accent hover:border-b-transparent hover:rounded-b-none'>
						<div>
							{user.username}{' '}
							<div className='w-4 overflow-hidden inline-block'>
								<div className='h-2.5 w-2.5 bg-slate-400 group-hover:bg-accent -rotate-45 transform origin-top-left'></div>
							</div>
						</div>
						<NavLink
							className='hidden -bottom-7 top-full -left-0.5 -right-0.5 absolute py-1 pb-7 px-5 bg-accent/30 border-2 border-t-0 rounded-b-md border-accent group-hover:block'
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
