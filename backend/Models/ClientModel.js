const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// todo add status of deal property
const ClientSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: true,
			min: 10,
			max: 10,
		},
		address: {
			type: String,
			required: true,
		},
		propertyType: { type: String, required: true },
		clientType: { type: String, required: true },
		size: {
			type: String,
			required: true,
		},
		sqft: {
			type: Number,
			required: true,
			min: 0,
		},
		budget: {
			type: Number,
			required: true,
			min: 0,
		},
		lead: {
			type: String,
			required: true,
		},
		leadAgentName: { type: String },
		leadOnlineName: { type: String },
	},
	{ discriminatorKey: 'clientType', timestamps: true }
);

const ClientModel = mongoose.model('Client', ClientSchema);

const RentClient = ClientModel.discriminator(
	'RENT',
	new Schema({
		rentParty: {
			type: String,
			enum: ['RENTER', 'HOMEOWNER'],
			required: true,
		},
	})
);

const SaleClient = ClientModel.discriminator(
	'SALE',
	new Schema({
		saleParty: {
			type: String,
			enum: ['BUYER', 'SELLER'],
			required: true,
		},
		loan: {
			type: Boolean,
			default: false,
		},
	})
);

module.exports = ClientModel;
