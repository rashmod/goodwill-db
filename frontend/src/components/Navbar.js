import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='flex justify-between container py-4 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto'>
			<span>Goodwill DB</span>
			<ul className='flex gap-16'>
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
			</ul>
		</nav>
	);
};

export default Navbar;
