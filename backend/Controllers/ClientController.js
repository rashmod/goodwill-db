const ClientModel = require('../Models/ClientModel');
const { validationResult } = require('express-validator');

// todo backend validation
// todo filters and search
// todo error handling
// todo add pagination
// todo authentication and authorization

// @desc Get all clients
// @route GET /api/clients
// @access Public
module.exports.getAllClientsController = async (req, res) => {
	try {
		const clients = await ClientModel.find().sort({ createdAt: -1 });

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
			propertyType,
			clientType,
			saleParty,
			loan,
			rentParty,
			size,
			sqft,
			budget,
			lead,
			leadAgentName,
			leadOnlineName,
		} = req.body;

		const errors = validationResult(req);
		console.log(errors.array());

		const client = new ClientModel({
			name,
			mobile,
			address,
			propertyType,
			clientType,
			saleParty,
			loan,
			rentParty,
			size,
			sqft,
			budget,
			lead,
			leadAgentName,
			leadOnlineName,
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

// @desc Update client
// @route PUT /api/clients/:clientId
// @access Public
module.exports.UpdateClientController = async (req, res) => {
	try {
		const { clientId } = req.params;
		const {
			name,
			mobile,
			address,
			propertyType,
			clientType,
			saleParty,
			loan,
			rentParty,
			size,
			sqft,
			budget,
			lead,
			leadAgentName,
			leadOnlineName,
		} = req.body;

		const client = await ClientModel.findById(clientId);

		if (client) {
			const updatedClient = await ClientModel.findByIdAndUpdate(
				clientId,
				{
					name,
					mobile,
					address,
					propertyType,
					clientType,
					saleParty,
					loan,
					rentParty,
					size,
					sqft,
					budget,
					lead,
					leadAgentName,
					leadOnlineName,
				}
			);

			res.status(200).json({
				success: true,
				data: updatedClient,
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
