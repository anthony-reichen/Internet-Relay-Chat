function socketLeaveChannel(socket, io) {
    socket.on("leaveRoom", (room) => {
        const message = { sender: "IRC manager", body: `${socket.username} has left the channel : ${room}`}
        socket.leave(room);
        io.to(room).emit("message", message);
    });
}

module.exports = socketLeaveChannel