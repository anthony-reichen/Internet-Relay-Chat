function socketUsersList(/* socket, */ io) {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            socketID: id,
            userID: socket.userID,
            username: socket.username
        });
    }
    io.emit("users", users)
}

module.exports = socketUsersList