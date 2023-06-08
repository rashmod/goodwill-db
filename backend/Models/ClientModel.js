const mongoose = require('mongoose');

const CONSTANT_LITERALS = require('../Constants/Constants');

const Schema = mongoose.Schema;

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
		propertyType: {
			type: String,
			required: true,
			enum: Object.values(CONSTANT_LITERALS.PROPERTY_TYPE),
		},
		clientType: {
			type: String,
			required: true,
			enum: Object.values(CONSTANT_LITERALS.CLIENT_TYPE),
		},
		rentParty: {
			type: String,
			enum: Object.values(CONSTANT_LITERALS.RENT_PARTY),
		},
		saleParty: {
			type: String,
			enum: Object.values(CONSTANT_LITERALS.SALE_PARTY),
		},
		loan: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			required: true,
		},
		area: {
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
			enum: Object.values(CONSTANT_LITERALS.LEAD),
		},
		leadAgentName: { type: String },
		leadOnlineName: {
			type: String,
			enum: Object.values(CONSTANT_LITERALS.LEAD_ONLINE_NAME),
		},
		dealStatus: {
			type: String,
			required: true,
			enum: Object.values(CONSTANT_LITERALS.DEAL_STATUS),
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const ClientModel = mongoose.model('Client', ClientSchema);

module.exports = ClientModel;
