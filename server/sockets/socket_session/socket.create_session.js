const User = require('../../models/users/users.schema')
const {v4: uuidv4} = require('uuid');

function socketCreateSession(socket) {
    
    const username = socket.handshake.auth.username;
    socket.sessionID = uuidv4();
    socket.userID = uuidv4();
    socket.username = username;
    const newSession = socket

    return newSession
}

module.exports = socketCreateSession