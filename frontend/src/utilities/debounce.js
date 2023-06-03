const debounce = (func, wait) => {
	let timeout;

	const debounced = (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};

	debounced.cancel = () => {
		clearTimeout(timeout);
	};

	return debounced;
};

export default debounce;
