const { faker, fakerEN_IN } = require('@faker-js/faker');

const CONSTANT_LITERALS = require('../Constants/Constants');
const randomNum = require('./randomNum');

const generateSizes = (limit) => {
	const arr = [];

	for (let i = 1; i <= limit; i++) {
		arr.push(`${i}BHK`);
	}

	return arr;
};

const PROPERTY_TYPE = Object.values(CONSTANT_LITERALS.PROPERTY_TYPE);
const CLIENT_TYPE = Object.values(CONSTANT_LITERALS.CLIENT_TYPE);
const SALE_PARTY = Object.values(CONSTANT_LITERALS.SALE_PARTY);
const RENT_PARTY = Object.values(CONSTANT_LITERALS.RENT_PARTY);
const LEAD = Object.values(CONSTANT_LITERALS.LEAD);
const LEAD_ONLINE_NAME = Object.values(CONSTANT_LITERALS.LEAD_ONLINE_NAME);
const DEAL_STATUS = Object.values(CONSTANT_LITERALS.DEAL_STATUS);
const LOAN = [true, false];
const SIZE = generateSizes(10);

const generateClients = (num, authorId = null) => {
	const arr = [];

	for (let i = 0; i < num; i++) {
		const name = faker.person.fullName();
		const mobile = fakerEN_IN.phone
			.number()
			.replace(/[^a-zA-Z0-9 ]/g, '')
			.slice(2);
		const address = `${faker.location.secondaryAddress()} ${faker.location.buildingNumber()} ${faker.location.street()} ${faker.location.city()} ${faker.location.zipCode()} ${faker.location.county()} ${faker.location.state()}`;
		const propertyType = PROPERTY_TYPE[randomNum(PROPERTY_TYPE.length)];
		const clientType = CLIENT_TYPE[randomNum(CLIENT_TYPE.length)];
		const saleParty = SALE_PARTY[randomNum(SALE_PARTY.length)];
		const rentParty = RENT_PARTY[randomNum(RENT_PARTY.length)];
		const sale_rent_party =
			clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT
				? { rentParty }
				: saleParty === CONSTANT_LITERALS.SALE_PARTY.SELLER
				? { saleParty }
				: { saleParty, loan: LOAN[randomNum(LOAN.length)] };
		const size = SIZE[randomNum(SIZE.length)];
		const area = randomNum(5000, 400);
		const budget =
			clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT
				? randomNum(300000, 10000)
				: randomNum(100000000, 3000000);
		const lead = LEAD[randomNum(LEAD.length)];
		const leadObj =
			lead === CONSTANT_LITERALS.LEAD.WALK_IN
				? { lead }
				: lead === CONSTANT_LITERALS.LEAD.ONLINE
				? {
						lead,
						leadOnlineName:
							LEAD_ONLINE_NAME[
								randomNum(LEAD_ONLINE_NAME.length)
							],
				  }
				: {
						lead,
						leadAgentName: faker.person.fullName(),
				  };
		const dealStatus = DEAL_STATUS[randomNum(DEAL_STATUS.length)];
		const author = authorId || '64803775567793519dd0619f';

		arr.push({
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
			author,
		});
	}

	return arr;
};

module.exports = generateClients;
