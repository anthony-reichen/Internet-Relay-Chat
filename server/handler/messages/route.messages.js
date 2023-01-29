const express = require('express');
const router = express.Router()
const messagesManager = require("../../manager/messages/manager.messages")

router.get("/:id", async function (req, res) {
    const result = await messagesManager.messagesGet(req.params.id)
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
});

router.put("/:id", async function (req, res) {
    const result = await messagesManager.messagesUpdate(req.params.id, req.body)
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
});

module.exports = router