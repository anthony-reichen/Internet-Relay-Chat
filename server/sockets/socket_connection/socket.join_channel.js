function socketJoinChannel(socket, io) {
    socket.on("joinRoom", (room) => {
        const message = { sender: "IRC manager", body: `${socket.username} has joined the channel : ${room}`}
        socket.join(room);
        io.to(room).emit("message", message);
    });
}

module.exports = socketJoinChannel