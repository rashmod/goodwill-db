const ClientModel = require('../Models/ClientModel');
const generateClients = require('./generateClients');
const randomNum = require('./randomNum');

const addClientsToDB = async (num = 1, authorId = null) => {
	const clients = generateClients(num, authorId);

	for (let i = 0; i < clients.length; i++) {
		const delay = authorId ? 50 : randomNum(1000, 500); // Random delay between 500ms and 1000ms
		await new Promise((resolve) => setTimeout(resolve, delay));

		const client = clients[i];
		const doc = new ClientModel(client);
		await doc.save();
		console.log(
			`Client ${i + 1} with name ${
				client.name
			} has been inserted into the database.`
		);
	}
};

module.exports = addClientsToDB;
