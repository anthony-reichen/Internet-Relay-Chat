const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	username: String,
	sessionId: String
});

const Users = mongoose.model('Users', schema);

// const users = mongoose.Schema({
// _id: mongoose.Schema.Types.ObjectId,
// 	nickname: String,
//  email: String,
//	password: String,
// 	channels: Array
// })

module.exports = Users