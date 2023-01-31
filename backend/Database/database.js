const mongoose = require('mongoose');

module.exports = connectDB = async () => {
	try {
		const con = await mongoose.connect(
			process.env.MONGO_URI
			//   {
			// 	useNewUrlParser: true,
			// 	useUnifiedTopology: true,
			// }
		);
		console.log(`MongoDB connected to host: ${con.connection.host}`);
	} catch (error) {
		console.log(`MongoDB connection failed: ${error}`);
	}
};
