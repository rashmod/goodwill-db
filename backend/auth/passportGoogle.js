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
			console.log(profile);

			const user = await UserModel.findOne({ googleId: profile.id });
			if (user) {
				return done(null, user);
			} else {
				const newUser = await UserModel.create({
					googleId: profile.id,
				});
				return done(null, newUser);
			}
		}
	)
);
