// @desc sign up users
// @route GET /api/auth/signup
// @access Public
module.exports.signup = async (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			data: req.user, // get the user from session
		});
	} else {
		res.status(401).json({
			success: false,
			error: 'Authentication Failed',
			// message: errors.array(),
		});
	}
};

module.exports.signout = async (req, res, next) => {
	if (req.user) {
		req.logout((err) => {
			if (err) return next(err);
			res.status(200).json({
				success: true,
			});
		});
	} else {
		res.status(400).json({
			success: false,
			error: 'Bad Request',
			// message: errors.array(),
		});
	}
};
