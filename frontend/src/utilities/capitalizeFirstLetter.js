const capitalizeFirstLetter = (str) => {
	const arr = str.split('-');

	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0) + arr[i].slice(1).toLowerCase();
	}

	return arr.join(' ');
};

export default capitalizeFirstLetter;
