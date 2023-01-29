const channelsRequests = require("../../db/channels/request.channels")

async function channelsPost(body) {
    const result = await channelsRequests.channelsPostRequest(body);
    return result
}

async function channelsGet() {
    const result = await channelsRequests.channelsGetRequest();
    return result
}

async function channelsUpdate(id, body) {
    const result = await channelsRequests.channelsUpdateRequest(id, body);
    return result
}

async function channelsDelete(id) {
    const result = await channelsRequests.channelsDeleteRequest(id);
    return result
}

async function channelsGetOne(id) {
    const result = await channelsRequests.channelsGetRequestbyId(id);
    return result
}

module.exports = { channelsPost, channelsGet, channelsUpdate, channelsDelete, channelsGetOne }