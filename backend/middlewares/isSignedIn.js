const isSignedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({
			success: false,
			error: 'Authentication Failed',
			msg: 'Access Restricted: Please Log In',
		});
	}
	next();
};

module.exports = isSignedIn;
