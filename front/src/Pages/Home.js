import * as React from 'react';
import Container from '@mui/material/Container';
import socket from '../config/socket';
import Drawer from '../Components/home/drawer'
import LoginAnonymous from '../Components/home/login_anonymous';
import Chat from '../Components/home/chat';
import NewSession from '../Request/new_session';
import '../index.css';
import { Box } from '@mui/system';
import channelsGet from '../Request/Fetch/request.channels_get';


export const ChatContext = React.createContext()

const initialState = {
    users: null,
    currentUser: null,
    currentChannel: "backroom",
    currentChannels: ["backroom"],
    input: "",
    usernameSelected: false,
    messages: [],
    channels: [],
    channelsName: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'setUsers':
            state.users = action.users
            return {
                ...state,
                users: state.users,
            }
        case 'loadMessages':
            state.messages = action.loadedMessages
            return {
                ...state,
                messages: state.messages
            }
        case 'setMessages':
            state.messages = [...state.messages, action.messages]
            return {
                ...state,
                messages: state.messages,
            }
        case 'setInput':
            state.input = action.input
            return {
                ...state,
                input: state.input
            }
        case 'setUsernameSelected':
            return {
                ...state,
                usernameSelected: !state.usernameSelected
            }
        case 'setChannels':
            state.channels = action.channels
            for (const channel of action.channels) {
                state.channelsName = [...state.channelsName, channel.channel_name]
            }
            return {
                ...state,
                channels: state.channels,
                channelsName: state.channelsName
            }
        case 'deleteChannel':
            state.channels = action.deleteChannel
            let newChannelList = []
            for (const channel of action.deleteChannel) {
                newChannelList = [...newChannelList, channel.channel_name]
            }
            state.channelsName = newChannelList

            let newCurrentChannels = []
            for (const channelUser of state.currentChannels) {
                if (newChannelList.includes(channelUser)) {
                    newCurrentChannels.push(channelUser)
                }
            }
            state.currentChannels = newCurrentChannels

            return {
                ...state,
                channels: state.channels,
                channelsName: state.channelsName,
                currentChannels: state.currentChannels
            }
        case 'createChannel':
            state.channels = [...state.channels, action.createChannel]
            state.channelsName = [...state.channelsName, action.createChannel.channel_name]
            return {
                ...state,
                channels: state.channels,
                channelsName: state.channelsName
            }
        case 'addChannelUser':
            state.currentUser = action.currentUser
            return {
                ...state,
                currentUser: state.currentUser
            }
        case 'addUserToChannel':
            state.currentChannels = [...state.currentChannels, action.currentChannels]
            state.currentChannel = action.currentChannels
            return {
                ...state,
                currentChannels: state.currentChannels,
                currentChannel: state.currentChannel
            }

        case 'removeUserFromChannel':
            let newUserChannels = []
            for (const channelUser of state.currentChannels) {
                //to check
                if (channelUser !== action.removedChannel) {
                    newUserChannels.push(channelUser)
                }
            }
            state.currentChannels = newUserChannels
            return{
                ...state,
                currentChannels: state.currentChannels
            }

        case 'setCurrentChannel':
            state.currentChannel = action.currentChannel
            return {
                ...state,
                currentChannel: state.currentChannel,
            }

        case 'modifyChannelName':
            console.log(action.args);
            if(state.currentChannel === action.args.oldName){
                state.currentChannel = action.args.newName
            }
            let newChannels = []
            for(let channel of state.channels){
                if(channel.channel_name === action.args.oldName){
                    channel.channel_name = action.args.newName
                }
                newChannels.push(channel)
            }
            state.channels = newChannels
            let newChannelsName = []
            for(let channelName of state.channelsName){
                if(channelName === action.args.oldName){
                    channelName = action.args.newName
                }
                newChannelsName.push(channelName)
            }
            state.channelsName = newChannelsName
            let newCurrentChannelsChange = []
            for(let currentChannelName of state.currentChannels){
                if(currentChannelName === action.args.oldName){
                    currentChannelName = action.args.newName
                }
                newCurrentChannelsChange.push(currentChannelName)
            }
            state.currentChannels = newCurrentChannelsChange
            return {
                ...state,
                currentChannel: state.currentChannel,
                channels: state.channels,
                channelsName: state.channelsName,
                currentChannels: state.currentChannels
            }
        default:
            throw new Error();
    }
}

function Home() {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        const fetchChannels = async () => {
            const result = await channelsGet()
            const messageBackroom = result.find(element => element.channel_name === "backroom");
            dispatch({ type: "setChannels", channels: result })
            dispatch({ type: "loadMessages", loadedMessages: messageBackroom.messages })
        }
        fetchChannels()

        const newSession = NewSession();
        if (newSession === true) {
            dispatch({ type: "setUsernameSelected" })
        }

        socket.on("connect_error", (err) => {
            if (err.message === "invalid name") {
                console.log("error: ", err);
            }
        });

        socket.on("session", ({ sessionID, userID, username, channels }) => {
            // attach the session ID to the next reconnection attempts
            socket.auth = { sessionID };
            // store it in the sessionStorage
            const sessionUser = ({
                sessionID: sessionID,
                userID: userID,
                username: username,
                channels: channels
            });

            dispatch({ type: "addChannelUser", currentUser: sessionUser })
            sessionStorage.setItem("sessionUser", JSON.stringify(sessionUser));
        });

        socket.on("message", (args) => {
            dispatch({ type: "setMessages", messages: args })
        });

        socket.on("private message", (args) => {
            dispatch({ type: "setMessages", messages: args })
        });

        socket.on("users", (users) => {
            dispatch({ type: "setUsers", users: users })
        });

        return () => {
            socket.off('message');
            socket.off('connect_error');
            socket.off('session')
        };
    }, [])

    return (
        <>
            <Container
                fixed
                sx={{
                    bgcolor: 'whitesmoke',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '0'
                }}
            >
                {state.usernameSelected ?
                    <ChatContext.Provider value={{ chatState: state, chatDispatch: dispatch }}>
                        <Drawer />
                        <Box
                            id='chatbox'
                            sx={{
                                pt: '3em',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Chat />
                        </Box>
                    </ChatContext.Provider>
                    :
                    <ChatContext.Provider value={{ chatState: state, chatDispatch: dispatch }}>
                        <LoginAnonymous />
                    </ChatContext.Provider>
                }
            </Container>
        </>
    )
}

export default Home;