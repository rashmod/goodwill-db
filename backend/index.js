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

app.use(
	expressSession({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
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
