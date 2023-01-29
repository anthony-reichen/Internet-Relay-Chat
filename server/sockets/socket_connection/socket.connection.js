const socketMessage = require("./socket.message");
const socketUsersList = require("./socket.users_list")
const socketJoinChannel = require("./socket.join_channel")
const socketLeaveChannel = require("./socket.leave_channel")
const socketPrivateMessage = require("./socket.private_message")

function socketConnection(socket, io) {
    socketMessage(socket, io)    
    socketPrivateMessage(socket, io)
    socketUsersList(io)
    socketJoinChannel(socket, io)
    socketLeaveChannel(socket, io)

    socket.on("change username", (newUsername) => {
        socket.username =  newUsername
        socketUsersList(io)
    })

    socket.emit("session", {
        sessionID: socket.sessionID,
        userID: socket.userID,
        username: socket.username,
        channels: ["backroom"]
    });


    socket.on("disconnect", () => {
        socketUsersList(io)
    })
}

module.exports = socketConnection