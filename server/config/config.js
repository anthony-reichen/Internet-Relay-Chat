const mongoose = require("mongoose")
const conn = mongoose.connect("mongodb://mongo-db:27017/irc")

module.exports = conn
