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

// todo format user input appropriately
module.exports.AddClientController = async (req, res) => {
	try {
		const {
			name,
			mobile,
			address,
			clientType,
			saleParty,
			loan,
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
			loan,
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

// @desc Delete client
// @route DELETE /api/clients/:clientId
// @access Public
module.exports.DeleteClientController = async (req, res) => {
	try {
		const { clientId } = req.params;

		const client = await ClientModel.findById(clientId);

		if (client) {
			await ClientModel.findByIdAndDelete(clientId);

			res.status(200).json({
				success: true,
				data: client,
			});
		} else {
			res.status(404).json({
				success: false,
				error: 'Could not find the client',
			});
		}
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
