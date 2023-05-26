const { body } = require('express-validator');

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
		.isIn([
			'RESIDENTIAL',
			'COMMERCIAL',
			'INDUSTRIAL',
			'OPEN-PLOT',
			'AGRICULTURAL',
		])
		.withMessage('Invalid Property Type'),
	body('clientType')
		.trim()
		.escape()
		.isIn(['SALE', 'RENT'])
		.withMessage('Invalid Client Type'),
	body('saleParty')
		.trim()
		.escape()
		.if(body('clientType').equals('SALE'))
		.isIn(['BUYER', 'SELLER'])
		.withMessage('Invalid Sale Party'),
	// body('loan').isIn([true, false]).withMessage('Invalid loan value'),
	body('loan'),
	body('rentParty')
		.trim()
		.escape()
		.if(body('clientType').equals('RENT'))
		.isIn(['HOMEOWNER', 'RENTER'])
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
		.isIn(['WALK-IN', 'ONLINE', 'REFERENCE'])
		.withMessage('Invalid Lead Type'),
	body('leadAgentName')
		.trim()
		.escape()
		.if(body('lead').equals('REFERENCE'))
		.notEmpty()
		.withMessage('Agent Name is required')
		.isLength({ min: 3 })
		.withMessage('Agent Name should be longer than 2 characters'),
	body('leadOnlineName')
		.trim()
		.escape()
		.if(body('lead').equals('ONLINE'))
		.isIn(['UNKNOWN', 'JUST-DIAL', 'SQUARE-YARDS'])
		.withMessage('Invalid Online Lead'),
];

module.exports = FormValidation;
