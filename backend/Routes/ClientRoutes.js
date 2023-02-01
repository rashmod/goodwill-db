const express = require('express');
const {
	getAllClientsController,
	AddClientController,
	DeleteClientController,
} = require('../Controllers/ClientController');

const router = express.Router();

router.get('/', getAllClientsController);
router.post('/', AddClientController);
router.delete('/:clientId', DeleteClientController);

module.exports = router;
