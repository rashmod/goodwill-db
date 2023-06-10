const ClientModel = require('../Models/ClientModel');

const deleteAllClients = async () => {
	await ClientModel.deleteMany({});
};

module.exports = deleteAllClients;
