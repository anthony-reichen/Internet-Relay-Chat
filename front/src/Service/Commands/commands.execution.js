import socket from '../../config/socket';
import channelsPost from '../../Request/Fetch/request.channels_post'
import channelsDelete from '../../Request/Fetch/request.channels_delete'
import channelsUpdate from '../../Request/Fetch/request.channels_update';


async function commandsExecutions(command, message, chatContext) {
    message.sender = "IRC manager"
    message.body = ""
    switch (command[0]) {
        case "/nick":
            const user = JSON.parse(sessionStorage.getItem("sessionUser"))
            const users = chatContext.chatState.users;
            const previousUsername = user.username

            const indexUser = (element) => element.username === user.username
            const findIndex = users.findIndex(indexUser)
            users[findIndex].username = command[1]

            user.username = command[1]
            sessionStorage.setItem("sessionUser", JSON.stringify(user));
            chatContext.chatDispatch({ type: "addChannelUser", currentUser: user })
            chatContext.chatDispatch({ type: "setUsers", users: users })

            message.body = `${previousUsername} is now ${command[1]}`
            socket.username = command[1]
            socket.emit("change username", command[1])
            socket.emit("message", message);
            chatContext.chatDispatch({ type: "setInput", input: "" })
            break;
        case "/list":
            if (command[1] !== undefined) {
                const channelFilter = chatContext.chatState.channelsName.filter(element => element.toLowerCase().includes(command[1]))
                for (const channel of channelFilter) {
                    message.body += channel + ", "
                }
                message.body = "List of channels : " + message.body.slice(0, -2)
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            } else {
                for (const channel of chatContext.chatState.channelsName) {
                    message.body += channel + ", "
                }
                message.body = "List of channels : " + message.body.slice(0, -2)
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            }
            break
        case "/users":
            for (const user of chatContext.chatState.users) {
                message.body += user.username + ", "
            }
            message.body = "List of Users : " + message.body.slice(0, -2)
            socket.emit("message", message);
            chatContext.chatDispatch({ type: "setInput", input: "" })
            break
        case "/create":
            if (chatContext.chatState.channelsName.includes(command[1])) {
                message.body = `'${command[1]}' already exists, choose another name`
                socket.emit("message", message);
            } else {
                const result = await channelsPost(command[1])
                chatContext.chatDispatch({ type: "createChannel", createChannel: result })
                message.body = `'${command[1]}' channel created !`
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            }
            break
        case "/delete":
            if (!chatContext.chatState.channelsName.includes(command[1])) {
                message.body = `'${command[1]}' does not exist`
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            } else if (chatContext.chatState.currentChannel === command[1]) {
                message.body = "Leave the current channel before deleting it"
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            } else if (command[1] === "backroom") {
                message.body = "Backroom cannot be deleted"
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            } else {
                const channels = chatContext.chatState.channels
                const findChannel = channels.find(element => element.channel_name === command[1])
                const getIndex = (element) => element.channel_name === command[1]
                const channelIndex = channels.findIndex(getIndex)
                await channelsDelete(findChannel._id)
                channels.splice(channelIndex, 1)
                chatContext.chatDispatch({ type: "deleteChannel", deleteChannel: channels })
                message.body = `'${command[1]}' channel deleted !`
                socket.emit("message", message);
                chatContext.chatDispatch({ type: "setInput", input: "" })
            }
            break
        case "/msg":
            const sessionStore = JSON.parse(sessionStorage.getItem('sessionUser'));
            let findUser = null
            for (const user of chatContext.chatState.users) {
                if (user.username === command[1]) {
                    findUser = user
                }
            }
            if (findUser === null) {
                message.sender = 'IRC manager'
                message.body = `'${command[1]}' does not exist`
                message.to = sessionStore.userID
                socket.emit("private message", message)
                chatContext.chatDispatch({ type: "setInput", input: "" })

            } else {
                message.body = "(private) " + command.slice(2).join(' ')
                message.sender = chatContext.chatState.currentUser.username
                message.to = findUser.userID
                socket.emit("private message", message)
                chatContext.chatDispatch({ type: "setInput", input: "" })
            }
            break
        case "/join":
            if (chatContext.chatState.channelsName.includes(command[1])) {
                socket.emit("joinRoom", command[1]);
                chatContext.chatDispatch({ type: "addUserToChannel", currentChannels: command[1] })
            } else {
                message.body = `'${command[1]}' room does not exist, choose an existing one (use /list to display them)`
                socket.emit("message", message);
            }
            chatContext.chatDispatch({ type: "setInput", input: "" })
            break;

        case "/quit":
            if (chatContext.chatState.channelsName.includes(command[1])) {
                socket.emit("leaveRoom", command[1]);
                chatContext.chatDispatch({ type: "removeUserFromChannel", removedChannel: command[1] })
                chatContext.chatDispatch({ type: "setCurrentChannel", currentChannel: "backroom" })
            } else {
                console.log("invalid room");
                message.body = `'${command[1]}' room does not exist, choose an existing one (use /list to display them)`
                socket.emit("message", message);
            }
            chatContext.chatDispatch({ type: "setInput", input: "" })
            break;
        case "/rename":
            if (chatContext.chatState.channelsName.includes(command[1])) {
                const id = chatContext.chatState.channels.find(element => element.channel_name === command[1]);
                console.log(await channelsUpdate(id._id, command[2]));
                await channelsUpdate(id._id, command[2])
                const args = {oldName: command[1], newName: command[2]}
                chatContext.chatDispatch({type: "modifyChannelName", args: args})
            }
            break;
        default:
            console.log("fail");
            break;
    }
}

export default commandsExecutions