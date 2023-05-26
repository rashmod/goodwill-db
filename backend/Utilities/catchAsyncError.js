// this takes the controller func as argument
// it returns a func for the routes method
// the async controller func is caught

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
