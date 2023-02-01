const express = require('express');
const {
	getAllClientsController,
	AddClientController,
} = require('../Controllers/ClientController');

const router = express.Router();

router.get('/', getAllClientsController);
router.post('/', AddClientController);

module.exports = router;
