/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			colors: {
				// accent: '#03e9f4',
				// accent: '#D1603D',
				accent: '#8075FF',
				'light-black': 'rgba(0,0,0,0.5)',
			},
			backgroundImage: (theme) => ({
				'gradient-bg': 'linear-gradient(#141e30, #243b55)',
			}),
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
