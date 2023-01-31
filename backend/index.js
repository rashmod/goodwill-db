const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./Database/database');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', (req, res) => {
	res.send('hello world');
});

connectDB();

app.listen(process.env.PORT, () => {
	console.log(`Server Running on port: ${process.env.PORT}`);
});
