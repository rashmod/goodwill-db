const CONSTANT_LITERALS = {
	PROPERTY_TYPE: {
		RESIDENTIAL: 'RESIDENTIAL',
		COMMERCIAL: 'COMMERCIAL',
		INDUSTRIAL: 'INDUSTRIAL',
		OPEN_PLOT: 'OPEN-PLOT',
		AGRICULTURAL: 'AGRICULTURAL',
	},
	CLIENT_TYPE: {
		SALE: 'SALE',
		RENT: 'RENT',
	},
	SALE_PARTY: {
		BUYER: 'BUYER',
		SELLER: 'SELLER',
	},
	RENT_PARTY: {
		RENTER: 'RENTER',
		HOMEOWNER: 'HOMEOWNER',
	},
	LEAD: {
		WALK_IN: 'WALK-IN',
		ONLINE: 'ONLINE',
		REFERENCE: 'REFERENCE',
	},
	LEAD_ONLINE_NAME: {
		UNKNOWN: 'UNKNOWN',
		JUST_DIAL: 'JUST-DIAL',
		SQUARE_YARDS: 'SQUARE-YARDS',
	},
	STATUS: {
		SUCCESS: 'SUCCESS',
		FAILURE: 'FAILURE',
		LOADING: 'LOADING',
	},
	DEAL_STATUS: {
		ONGOING: 'ONGOING',
		CLOSED: 'CLOSED',
		DROPPED: 'DROPPED',
	},
};

module.exports = CONSTANT_LITERALS;
