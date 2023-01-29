function leaveChannel(){
    socket.emit("leaveRoom", "thisRoom");
    return;
}
export default leaveChannel;