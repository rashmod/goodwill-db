const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const ClientModel = require('../Models/ClientModel');

const arr = ['ONGOING', 'CLOSED', 'DROPPED'];

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error'));
db.once('open', () => {
	console.log('database connected');
});

const randomNum = (n = 3) => {
	return Math.floor(Math.random() * n);
};

const seedDealStatus = async () => {
	const res = await ClientModel.find();
	res.forEach(async (doc) => {
		try {
			await ClientModel.findByIdAndUpdate(
				{ _id: doc._id },
				{ $set: { dealStatus: arr[randomNum()] } }
			);
		} catch (error) {
			console.log(error);
		}
	});
};

const displayAll = async () => {
	const clients = await ClientModel.find();

	console.log(clients.length);
	for (let i = 0; i < 10; i++) {
		console.log(clients[i]);
	}
};

// seedDealStatus().then(() => {
// 	console.log('============');
// 	console.log('close connection');
// 	// db.close();
// });

displayAll().then(() => {
	db.close();
});
