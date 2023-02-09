const express = require('express');
const {
	getAllClientsController,
	AddClientController,
	DeleteClientController,
	UpdateClientController,
} = require('../Controllers/ClientController');

const router = express.Router();

router.get('/', getAllClientsController);
router.post('/', AddClientController);
router.delete('/:clientId', DeleteClientController);
router.put('/:clientId', UpdateClientController);

module.exports = router;
