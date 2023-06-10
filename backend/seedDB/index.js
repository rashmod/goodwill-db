const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const displayAllClients = require('./displayAllClients');
const deleteAllClients = require('./deleteAllClients');
const addClientsToDB = require('./addClientsToDB');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error'));
db.once('open', () => {
	console.log('database connected');
});

// addClientsToDB(5).then(() => {
// 	console.log('closing db connection');
// 	db.close();
// 	console.log('closed db connection');
// });

// deleteAllClients().then(() => {
// 	console.log('closing db connection');
// 	db.close();
// 	console.log('closed db connection');
// });

displayAllClients().then(() => {
	console.log('closing db connection');
	db.close();
	console.log('closed db connection');
});
