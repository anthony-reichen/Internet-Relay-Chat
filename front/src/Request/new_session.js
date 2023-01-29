import socket from '../config/socket';

function NewSession() {
    //const sessionID = localStorage.getItem("sessionID"); // The session is shared across the browser tabs (=/= sessionStorage)
    const sessionID = JSON.parse(sessionStorage.getItem("sessionUser"));

    if (sessionID) {
        //this.usernameAlreadySelected = true;
        socket.auth = { sessionID };
        socket.connect();
        socket.emit("joinRoom", "backroom")
        return true;
    }
    return false;
}

export default NewSession;