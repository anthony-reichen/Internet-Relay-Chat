const messagesRequests = require("../../db/messages/request.messages")

async function messagesGet(id) {
    const result = await messagesRequests.messagesGetRequest(id);
    return result
}

async function messagesUpdate(id, body) {
    const result = await messagesRequests.messagesUpdateRequest(id, body);
    return result
}

module.exports = { messagesGet, messagesUpdate }