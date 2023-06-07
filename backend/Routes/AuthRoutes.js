const express = require('express');
const passport = require('passport');
const catchAsyncError = require('../Utilities/catchAsyncError');
const { signup, signout } = require('../Controllers/AuthController');

const router = express.Router();

router.get('/google', passport.authenticate('google', ['profile']));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: `${process.env.CLIENT_URL}/signup?failure=true`,
	})
);

router.get('/signup', catchAsyncError(signup));
router.get('/signout', catchAsyncError(signout));

module.exports = router;
