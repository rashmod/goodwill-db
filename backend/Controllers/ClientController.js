const ClientModel = require('../Models/ClientModel');

// @desc Get all clients
// @route GET /api/clients
// @access Public
module.exports.getAllClientsController = async (req, res) => {
	try {
		const clients = await ClientModel.find();

		res.status(200).json({
			success: true,
			count: clients.length,
			data: clients,
		});
	} catch (error) {
		console.log('===========ERROR===========');
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Server Error',
			message: error,
		});
	}
};

// @desc Add client
// @route POST /api/clients
// @access Public
module.exports.AddClientController = async (req, res) => {
	try {
		const {
			name,
			mobile,
			address,
			clientType,
			saleParty,
			rentParty,
			size,
			sqft,
			budget,
			lead,
		} = req.body;

		const client = new ClientModel({
			name,
			mobile,
			address,
			clientType,
			saleParty,
			rentParty,
			size,
			sqft,
			budget,
			lead,
		});

		await client.save();

		res.status(200).json({
			success: true,
			data: client,
		});
	} catch (error) {
		console.log('===========ERROR===========');
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Server Error',
			message: error,
		});
	}
};
