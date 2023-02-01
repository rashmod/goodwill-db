const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./Database/database');
const ClientRoutes = require('./Routes/ClientRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/clients', ClientRoutes);

connectDB();

app.listen(process.env.PORT, () => {
	console.log(`Server Running on port: ${process.env.PORT}`);
});
