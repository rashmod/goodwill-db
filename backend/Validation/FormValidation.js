const { body } = require('express-validator');
const CONSTANT_LITERALS = require('../Constants/Constants');

const FormValidation = [
	body('name')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Name is required')
		.isLength({ min: 3 })
		.withMessage('Name should be longer than 2 characters'),
	body('mobile')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Mobile Number is required')
		.isMobilePhone('en-IN')
		.withMessage('Mobile Number is invalid'),
	body('address')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Address is required'),
	body('propertyType')
		.trim()
		.escape()
		.isIn(Object.values(CONSTANT_LITERALS.PROPERTY_TYPE))
		.withMessage('Invalid Property Type'),
	body('clientType')
		.trim()
		.escape()
		.isIn(Object.values(CONSTANT_LITERALS.CLIENT_TYPE))
		.withMessage('Invalid Client Type'),
	body('saleParty')
		.trim()
		.escape()
		.if(body('clientType').equals(CONSTANT_LITERALS.CLIENT_TYPE.SALE))
		.isIn(Object.values(CONSTANT_LITERALS.SALE_PARTY))
		.withMessage('Invalid Sale Party'),
	// body('loan').isIn([true, false]).withMessage('Invalid loan value'),
	body('loan'),
	body('rentParty')
		.trim()
		.escape()
		.if(body('clientType').equals(CONSTANT_LITERALS.CLIENT_TYPE.RENT))
		.isIn(Object.values(CONSTANT_LITERALS.RENT_PARTY))
		.withMessage('Invalid Rent Party'),
	body('size')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Property size is required'),
	body('sqft')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Area is required')
		.isNumeric()
		.withMessage('Area should be a number')
		.isInt({ min: 0 })
		.withMessage('Area should not be less than 0'),
	body('budget')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Budget is required')
		.isNumeric()
		.withMessage('Budget should be a number')
		.isInt({ min: 0 })
		.withMessage('Budget should not be less than 0'),
	body('lead')
		.trim()
		.escape()
		.isIn(Object.values(CONSTANT_LITERALS.LEAD))
		.withMessage('Invalid Lead Type'),
	body('leadAgentName')
		.trim()
		.escape()
		.if(body('lead').equals(CONSTANT_LITERALS.LEAD.REFERENCE))
		.notEmpty()
		.withMessage('Agent Name is required')
		.isLength({ min: 3 })
		.withMessage('Agent Name should be longer than 2 characters'),
	body('leadOnlineName')
		.trim()
		.escape()
		.if(body('lead').equals(CONSTANT_LITERALS.LEAD.ONLINE))
		.isIn(Object.values(CONSTANT_LITERALS.LEAD_ONLINE_NAME))
		.withMessage('Invalid Online Lead'),
	body('dealStatus')
		.trim()
		.escape()
		.isIn(Object.values(CONSTANT_LITERALS.DEAL_STATUS))
		.withMessage('Invalid Deal Status'),
];

module.exports = FormValidation;
