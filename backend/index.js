const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');

const connectDB = require('./Database/database');
const ClientRoutes = require('./Routes/ClientRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');
const passportGoogle = require('./auth/passportGoogle');

const app = express();

if (process.env.NODE_ENV === 'PRODUCTION') {
	app.set('trust proxy', 1);

	app.use(
		expressSession({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
			cookie: {
				sameSite: 'none',
				secure: true,
				maxAge: 1000 * 60 * 60 * 24 * 7, // one week
			},
		})
	);
}

if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(
		expressSession({
			secret: process.env.COOKIE_SECRET,
			resave: true,
			saveUninitialized: true,
		})
	);
}

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use('/api/clients', ClientRoutes);
app.use('/api/auth', AuthRoutes);

connectDB();

app.listen(process.env.PORT, () => {
	console.log(`Server Running on port: ${process.env.PORT}`);
});
