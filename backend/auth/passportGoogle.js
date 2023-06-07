const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const UserModel = require('../Models/UserModel');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/api/auth/google/callback',
			scope: ['profile'],
		},
		async (_accessToken, _refreshToken, profile, done) => {
			const user = await UserModel.findOne({ googleId: profile.id });
			if (user) {
				return done(null, user);
			} else {
				const newUser = await UserModel.create({
					googleId: profile.id,
					username: profile.displayName,
				});
				return done(null, newUser);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	const user = await UserModel.findById(id);
	return done(null, user);
});
