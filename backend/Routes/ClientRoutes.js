const express = require('express');
const {
	getAllClientsController,
	AddClientController,
	DeleteClientController,
	UpdateClientController,
} = require('../Controllers/ClientController');
const FormValidation = require('../Validation/FormValidation');
const catchAsyncError = require('../Utilities/catchAsyncError');
const isSignedIn = require('../middlewares/isSignedIn');
const isAuthor = require('../middlewares/isAuthor');

const router = express.Router();

router.get('/', isSignedIn, catchAsyncError(getAllClientsController));
router.post(
	'/',
	isSignedIn,
	FormValidation,
	catchAsyncError(AddClientController)
);
router.delete(
	'/:clientId',
	isSignedIn,
	isAuthor,
	catchAsyncError(DeleteClientController)
);
router.put(
	'/:clientId',
	isSignedIn,
	isAuthor,
	FormValidation,
	catchAsyncError(UpdateClientController)
);

module.exports = router;
