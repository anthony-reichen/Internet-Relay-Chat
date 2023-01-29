function socketPrivateMessage(socket, io) {
    socket.join(socket.userID);

    socket.on("private message", (message) => {
        message.timestamp = Date.now();
        io.to(message.to).to(socket.userID).emit("private message", message, {from: socket.userID});
    });
}

module.exports = socketPrivateMessage