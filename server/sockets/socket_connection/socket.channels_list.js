function socketChannelsList(io) {
    console.log("socket channel list", io.sockets.adapter.rooms);
}

module.exports = socketChannelsList