const express = require('express');
const {
	getAllClientsController,
	AddClientController,
	DeleteClientController,
	UpdateClientController,
} = require('../Controllers/ClientController');
const FormValidation = require('../Validation/FormValidation');

const router = express.Router();

router.get('/', getAllClientsController);
router.post('/', FormValidation, AddClientController);
router.delete('/:clientId', DeleteClientController);
router.put('/:clientId', FormValidation, UpdateClientController);

module.exports = router;
