const User = require('../../models/users/users.schema')
function socketFindSession(socket) {

    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
        socket.sessionID = sessionID.sessionID;
        socket.userID = sessionID.userID;
        socket.username = sessionID.username;
        return socket;
    }
    return false
}

module.exports = socketFindSession