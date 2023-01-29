function joinChannel(chatContext, socket){
    socket.emit("joinRoom", "thisRoom");
    let currentUser;
    for (const user in chatContext.chatState.users) {
        if (JSON.parse(sessionStorage.getItem("sessionUser")).userID === user.userID) {
            currentUser = user;
            currentUser.channels.push("thisRoom");
        }
    }
    chatContext.chatDispatch({type: 'addChannelUser', currentUser: currentUser})

    return;
}

export default joinChannel;