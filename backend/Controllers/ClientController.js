const CONSTANT_LITERALS = require('../Constants/Constants');
const ClientModel = require('../Models/ClientModel');
const { validationResult } = require('express-validator');
const APIFeatures = require('../Utilities/apiFeatures');

// ? should error message have valid field inputs?

// @desc Get all clients
// @route GET /api/clients
// @access Public
module.exports.getAllClientsController = async (req, res) => {
	const resPerPage = 20;
	const authorId = req.user._id;
	const clientCount = await ClientModel.countDocuments();

	const apiFeatures = new APIFeatures(
		ClientModel.find({ author: authorId }).sort({ createdAt: -1 }),
		req.query
	)
		.search()
		.filter()
		.pagination(resPerPage);

	const clients = await apiFeatures.query;
	const filteredCount = await apiFeatures.filteredCount();

	// const clients = await ClientModel.find().sort({ createdAt: -1 });

	res.status(200).json({
		success: true,
		responseCount: clients.length,
		totalClientCount: clientCount,
		resPerPage,
		filteredCount,
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
		area,
		budget,
		lead,
		leadAgentName,
		leadOnlineName,
		dealStatus,
	} = req.body;

	const authorId = req.user._id;

	const loanValue =
		clientType === 'SALE' && saleParty === 'BUYER' && loan === true;

	const sale_rent_party =
		clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT
			? { rentParty }
			: saleParty === CONSTANT_LITERALS.SALE_PARTY.SELLER
			? { saleParty }
			: { saleParty, loan: loanValue };

	const leadObj =
		lead === CONSTANT_LITERALS.LEAD.WALK_IN
			? { lead }
			: lead === CONSTANT_LITERALS.LEAD.ONLINE
			? { lead, leadOnlineName }
			: { lead, leadAgentName };

	const errors = validationResult(req);
	console.log(errors.array());

	if (errors.array().length === 0) {
		const client = new ClientModel({
			name,
			mobile,
			address,
			propertyType,
			clientType,
			...sale_rent_party,
			size,
			area,
			budget,
			...leadObj,
			dealStatus,
			author: authorId,
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
		area,
		budget,
		lead,
		leadAgentName,
		leadOnlineName,
		dealStatus,
	} = req.body;

	const loanValue =
		clientType === 'SALE' && saleParty === 'BUYER' && loan === true;

	const sale_rent_party =
		clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT
			? { rentParty }
			: saleParty === CONSTANT_LITERALS.SALE_PARTY.SELLER
			? { saleParty }
			: { saleParty, loan: loanValue };

	const leadObj =
		lead === CONSTANT_LITERALS.LEAD.WALK_IN
			? { lead }
			: lead === CONSTANT_LITERALS.LEAD.ONLINE
			? { lead, leadOnlineName }
			: { lead, leadAgentName };

	let unset = {};

	unset =
		clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT
			? { ...unset, saleParty: 1, loan: 1 }
			: { ...unset, rentParty: 1 };

	unset =
		lead === CONSTANT_LITERALS.LEAD.WALK_IN
			? { ...unset, leadOnlineName: 1, leadAgentName: 1 }
			: lead === CONSTANT_LITERALS.LEAD.ONLINE
			? { ...unset, leadAgentName: 1 }
			: { ...unset, leadOnlineName: 1 };

	const errors = validationResult(req);
	console.log(errors.array());

	const client = await ClientModel.findById(clientId);

	if (client) {
		if (errors.array().length === 0) {
			const updatedClient = await ClientModel.findByIdAndUpdate(
				clientId,
				{
					$set: {
						name,
						mobile,
						address,
						propertyType,
						clientType,
						...sale_rent_party,
						size,
						area,
						budget,
						...leadObj,
						dealStatus,
					},
					$unset: unset,
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
