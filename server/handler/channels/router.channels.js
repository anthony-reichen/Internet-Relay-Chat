const express = require('express');
const router = express.Router()

const channelsManager = require("../../manager/channels/manager.channels")

router.post("/", async function (req, res) {
    const result = await channelsManager.channelsPost(req.body)
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
});

router.get("/", async function (req, res) {
    const result = await channelsManager.channelsGet()
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
});

router.get("/:id", async function (req, res) {
    const result = await channelsManager.channelsGetOne(req.params.id)
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
});

router.put("/:id", async function (req, res) {
    const result = await channelsManager.channelsUpdate(req.params.id, req.body)
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
});

router.delete("/:id", async function (req, res) {
    const result = await channelsManager.channelsDelete(req.params.id)
    if (result instanceof Error) {
        return res.status(500).json(result)
    }
    return res.status(200).json(result)
})

module.exports = router