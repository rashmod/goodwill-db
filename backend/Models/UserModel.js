const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({ googleId: String }, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
