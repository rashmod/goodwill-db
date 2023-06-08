import React, { useEffect, useState } from 'react';
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

	const [hamburger, setHamburger] = useState(false);

	useEffect(() => {
		document.body.style.overflowX = 'hidden';
		if (hamburger) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'unset';
		}
	}, [hamburger]);

	return (
		<nav className='flex justify-between items-center container text-sm sm:text-base py-4 px-4 sm:px-0 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto'>
			<span>Goodwill DB</span>
			<div
				className='md:hidden relative h-4 w-5 group'
				onClick={() => {
					setHamburger((prev) => !prev);
				}}>
				<span
					className={`transition-all block absolute h-0.5 w-5 bg-white top-0 ${
						hamburger ? 'rotate-45 top-1/2 -translate-y-1/2' : ''
					}`}
				/>
				<span
					className={`transition-all block absolute h-0.5 w-5 bg-white top-1/2 -translate-y-1/2 ${
						hamburger ? 'opacity-0' : ''
					}`}
				/>
				<span
					className={`transition-all block absolute h-0.5 w-5 bg-white bottom-0 ${
						hamburger ? '-rotate-45 top-1/2 -translate-y-1/2' : ''
					}`}
				/>
			</div>
			<div
				className={`flex justify-center items-center absolute bg-black/95 z-50 inset-0 top-14 translate-x-full transition-all ${
					hamburger ? 'translate-x-0' : ''
				}`}>
				<div className='flex flex-col items-center gap-24 text-2xl font-semibold'>
					{isSignedIn && (
						<div className='text-3xl'>{user.username}</div>
					)}
					<ul className='grid gap-6'>
						<li>
							<NavLink
								onClick={() => setHamburger(false)}
								className={({ isActive }) =>
									isActive &&
									'underline underline-offset-4 text-accent'
								}
								to='/'>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								onClick={() => setHamburger(false)}
								className={({ isActive }) =>
									isActive &&
									'underline underline-offset-4 text-accent'
								}
								to='/addClient'>
								Add Client
							</NavLink>
						</li>
						{isSignedIn ? (
							<li>
								<NavLink
									onClick={() => {
										dispatch(userSignOut());
										setHamburger(false);
									}}
									className={({ isActive }) =>
										isActive &&
										'underline underline-offset-4 text-accent'
									}
									to='/signup'>
									Sign Out
								</NavLink>
							</li>
						) : (
							<li>
								<NavLink
									onClick={() => setHamburger(false)}
									className={({ isActive }) =>
										isActive &&
										'underline underline-offset-4 text-accent'
									}
									to='/signup'>
									Sign Up
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			</div>
			<ul className='hidden md:flex items-center gap-6 sm:gap-16'>
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive && 'underline underline-offset-4'
						}
						to='/'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive && 'underline underline-offset-4'
						}
						to='/addClient'>
						Add Client
					</NavLink>
				</li>
				{isSignedIn ? (
					<li className='group relative py-1 md:px-5 rounded-md border-2 border-slate-400 hover:bg-accent/30 hover:border-accent hover:border-b-transparent hover:rounded-b-none'>
						<div className=''>
							{user.username}{' '}
							<div className='w-2 md:w-4 overflow-hidden inline-block'>
								<div className='h-1.5 w-1.5 md:h-2.5 md:w-2.5 bg-slate-400 group-hover:bg-accent -rotate-45 transform origin-top-left'></div>
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
								isActive && 'underline underline-offset-4'
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
