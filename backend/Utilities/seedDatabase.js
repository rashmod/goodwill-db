const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { faker, fakerEN_IN } = require('@faker-js/faker');

const ClientModel = require('../Models/ClientModel');
const CONSTANT_LITERALS = require('../Constants/Constants');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error'));
db.once('open', () => {
	console.log('database connected');
});

const randomNum = (max, min = 0) => {
	return Math.floor(Math.random() * (max - min) + min);
};

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

const generateClients = (num) => {
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
		const budget = randomNum(200000000, 50000);
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
		});
	}

	return arr;
};

const addClientsToDB = async (num = 1) => {
	const clients = generateClients(num);

	const docs = await ClientModel.insertMany(clients);
	console.log(`${docs.length} users have been inserted into the database.`);
};

const deleteAll = async () => {
	const clients = await ClientModel.deleteMany({});
};

const displayAll = async (limit = 5) => {
	const clients = await ClientModel.find().limit(limit);
	const count = await ClientModel.countDocuments();
	console.log(count);
	console.log(clients);
};

// console.log(generateClients(1));

// addClientsToDB();

// addClientsToDB(50).then(() => {
// 	console.log('closing db connection');
// 	db.close();
// 	console.log('closed db connection');
// });

// deleteAll().then(() => {
// 	console.log('closing db connection');
// 	db.close();
// 	console.log('closed db connection');
// });

displayAll().then(() => {
	console.log('closing db connection');
	db.close();
	console.log('closed db connection');
});
