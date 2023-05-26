const catchAsyncError = (fn) => {
	return function (req, res) {
		fn(req, res).catch((error) => {
			console.log('===========ERROR===========');
			console.log(error);
			res.status(500).json({
				success: false,
				error: 'Server Error',
				message: error,
			});
		});
	};
};

module.exports = catchAsyncError;
