function removeEmpty(obj) {
	return Object.entries(obj)
		.filter(([_, v]) => v !== '' && v !== -1)
		.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

export default removeEmpty;
