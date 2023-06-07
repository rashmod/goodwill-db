const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: { type: String, required: true },
		googleId: String,
		role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
	},
	{ timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
