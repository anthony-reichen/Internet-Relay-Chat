function socketSessionCheckUsername(socket) {
    const username = socket.handshake.auth.username;

    if (!username) {
        return new Error("invalid username");
    }

    return false
}

module.exports = socketSessionCheckUsername;