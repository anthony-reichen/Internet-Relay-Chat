const Channel = require("../../models/channels/channels.schema")

async function messagesGetRequest(id) {
    try {
        const result = await Channel.findById(id)
        return result.messages
    } catch (error) {
        return new Error(error)
    }
}

async function messagesUpdateRequest(id, body) {
    try {
        await Channel.findByIdAndUpdate(id, { messages: body.messages }, { overwrite: true })
        return { response: "Channel updated !" }
    } catch (error) {
        return new Error(error)
    }
}

module.exports = { messagesGetRequest, messagesUpdateRequest }