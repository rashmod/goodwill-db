const ClientModel = require('../Models/ClientModel');
const { validationResult } = require('express-validator');

// ? should error message have valid field inputs?

// @desc Get all clients
// @route GET /api/clients
// @access Public
module.exports.getAllClientsController = async (req, res) => {
	const clients = await ClientModel.find().sort({ createdAt: -1 });

	res.status(200).json({
		success: true,
		count: clients.length,
		data: clients,
	});
};

// @desc Add client
// @route POST /api/clients
// @access Public

module.exports.AddClientController = async (req, res) => {
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

	const loanValue =
		clientType === 'SALE' && saleParty === 'BUYER' && loan === true;

	const errors = validationResult(req);
	console.log(errors.array());

	if (errors.array().length === 0) {
		const client = new ClientModel({
			name,
			mobile,
			address,
			propertyType,
			clientType,
			saleParty,
			loan: loanValue,
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
	} else {
		res.status(400).json({
			success: false,
			error: 'Validation Error',
			message: errors.array(),
		});
	}
};

// @desc Delete client
// @route DELETE /api/clients/:clientId
// @access Public
module.exports.DeleteClientController = async (req, res) => {
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
};

// @desc Update client
// @route PUT /api/clients/:clientId
// @access Public
module.exports.UpdateClientController = async (req, res) => {
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

	const loanValue =
		clientType === 'SALE' && saleParty === 'BUYER' && loan === true;

	const errors = validationResult(req);
	console.log(errors.array());

	const client = await ClientModel.findById(clientId);

	if (client) {
		if (errors.array().length === 0) {
			const updatedClient = await ClientModel.findByIdAndUpdate(
				clientId,
				{
					name,
					mobile,
					address,
					propertyType,
					clientType,
					saleParty,
					loan: loanValue,
					rentParty,
					size,
					sqft,
					budget,
					lead,
					leadAgentName,
					leadOnlineName,
				},
				{
					runValidators: true,
					new: true,
				}
			);

			res.status(200).json({
				success: true,
				data: updatedClient,
			});
		} else {
			res.status(400).json({
				success: false,
				error: 'Validation Error',
				message: errors.array(),
			});
		}
	} else {
		res.status(404).json({
			success: false,
			error: 'Could not find the client',
		});
	}
};
