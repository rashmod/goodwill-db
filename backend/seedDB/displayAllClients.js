const ClientModel = require('../Models/ClientModel');

const displayAllClients = async (limit = 3) => {
	const clients = await ClientModel.find().limit(limit);
	const count = await ClientModel.countDocuments();
	console.log(count);
	console.log(clients);
};

module.exports = displayAllClients;
