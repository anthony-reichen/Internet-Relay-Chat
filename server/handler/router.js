const express = require("express");
const router = express.Router();

const channelsRouter = require("./channels/router.channels")
const messagesRouter = require("./messages/route.messages")

router.get("/", function (req, res) {
    res.send("Welcome to irc server");
});

router.use("/api/channels", channelsRouter)
router.use("/api/messages", messagesRouter)


module.exports = router