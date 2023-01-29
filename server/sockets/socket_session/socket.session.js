const socketFindSession = require("./socket.find_session")
const socketSessionCheckUsername = require("./socket.check_username_session")
const socketCreateSession = require ("./socket.create_session")

async function socketSession(socket, io) {
    // check if the session exists
    if (socketFindSession(socket) !== false) {
        return socketFindSession(socket)
    }
    // check if the username is empty
    if (socketSessionCheckUsername(socket, io) !== false) {
        return socketSessionCheckUsername(socket, io)
    }
    // create new session
    return socketCreateSession(socket);
}

module.exports = socketSession