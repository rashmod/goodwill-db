const express = require('express');
const {
	getAllClientsController,
	AddClientController,
	DeleteClientController,
	UpdateClientController,
} = require('../Controllers/ClientController');
const FormValidation = require('../Validation/FormValidation');
const catchAsyncError = require('../Utilities/catchAsyncError');
const { isSignedIn } = require('../middlewares/isSignedIn');

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
	catchAsyncError(DeleteClientController)
);
router.put(
	'/:clientId',
	isSignedIn,
	FormValidation,
	catchAsyncError(UpdateClientController)
);

module.exports = router;
