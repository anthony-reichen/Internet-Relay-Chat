const mongoose = require("mongoose")

const channels = mongoose.Schema({
	channel_name: String,
	messages: [{
		sender: String,
		body: String,
		timestamp: Date
	}] 
	//trouver comment dire que c'est facultatif OMG NICOLAS
})

module.exports = mongoose.model("Channels", channels)