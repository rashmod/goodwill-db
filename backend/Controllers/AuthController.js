// @desc sign up users
// @route GET /api/auth/signup
// @access Public
module.exports.signup = async (req, res) => {
	res.status(200).json({
		success: true,
		data: req.user, // get the user from session
	});
};
