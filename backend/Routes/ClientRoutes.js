const express = require('express');
const {
	getAllClientsController,
	AddClientController,
	DeleteClientController,
	UpdateClientController,
} = require('../Controllers/ClientController');
const FormValidation = require('../Validation/FormValidation');
const catchAsyncError = require('../Utilities/catchAsyncError');

const router = express.Router();

router.get('/', catchAsyncError(getAllClientsController));
router.post('/', FormValidation, catchAsyncError(AddClientController));
router.delete('/:clientId', catchAsyncError(DeleteClientController));
router.put(
	'/:clientId',
	FormValidation,
	catchAsyncError(UpdateClientController)
);

module.exports = router;
