const Channel = require("../../models/channels/channels.schema")

async function channelsPostRequest(body) {
    try {
        return await Channel.create(body)
    } catch (error) {
        return new Error(error)
    }
}

async function channelsGetRequest() {
    try {
        return await Channel.find()
    } catch (error) {
        return new Error(error)
    }
}

async function channelsUpdateRequest(id, body) {
    try {
        const response = await Channel.findByIdAndUpdate(id, body)
        console.log(await response);
        console.log(await Channel.findByIdAndUpdate(id, body));
        return { response: "Channel updated !" }
    } catch (error) {
        return new Error(error)
    }
}

async function channelsDeleteRequest(id) {
    try {
        await Channel.findByIdAndDelete(id)
        return { response: "Channel deleted !" }
    } catch (error) {
        return new Error(error)
    }
}

async function channelsGetRequestbyId(id) {
    try {
        return await Channel.findOne({ _id: id })
    } catch (error) {
        return new Error(error)
    }
}

module.exports = {
    channelsPostRequest,
    channelsGetRequest,
    channelsUpdateRequest,
    channelsDeleteRequest,
    channelsGetRequestbyId
}