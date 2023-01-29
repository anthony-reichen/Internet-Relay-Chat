import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { Button, Paper, TextField } from "@mui/material"
import { Box, Stack } from "@mui/system"
import socket from '../../config/socket';
import uuid from 'react-uuid';
import { useContext, useState, /* useState */ } from "react";
import { ChatContext } from "../../Pages/Home";
import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import commandsControl from '../../Service/Commands/commands.control'
import commandsExecutions from '../../Service/Commands/commands.execution';
import messageGet from '../../Request/Fetch/request.message_get';

function Chat() {

    const chatContext = useContext(ChatContext);

    const connectSocket = async (messageBody) => {
        const messageBodyArray = messageBody.split(' ')
        const message = {
            room: chatContext.chatState.currentChannel,
            sender: chatContext.chatState.currentUser.username,
            body: messageBody
        }
        if (messageBody[0] !== "/" && commandsControl(messageBody) === false) {
            socket.emit("message", message);
            chatContext.chatDispatch({ type: "setInput", input: "" })
            return null
        }
        await commandsExecutions(messageBodyArray, message, chatContext)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const initMessages = async (currentChannel) => {
        var channelId;
        chatContext.chatState.channels.forEach(element => {
            if (element.channel_name === currentChannel) {
                channelId = element._id;
            }
        })
        const result = await messageGet(channelId)
        chatContext.chatDispatch({ type: "loadMessages", loadedMessages: result })
        chatContext.chatDispatch({ type: "setCurrentChannel", currentChannel: currentChannel })
    }

    return (
        <>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    {chatContext.chatState.currentChannels[0] !== undefined &&
                        chatContext.chatState.currentChannels.map((element, index) =>
                            <Tab key={index} label={element} onClick={() => initMessages(element)} />
                        )}
                </Tabs>
            </Box>
            <Box
                sx={{
                    width: '80%',
                    border: 'solid black',
                    height: '70%',
                    overflow: 'scroll'
                }}
            >
                <Stack spacing={2}>
                    {chatContext.chatState.messages[0] !== undefined &&
                        chatContext.chatState.messages.map((element) =>
                            <Item key={uuid()}>{element.sender}: {element.body}</Item>
                        )}
                </Stack>
            </Box>
            <Box
                id='text'
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '80%',
                    pt: "3em"
                }}
            >
                <TextField
                    onChange={e => chatContext.chatDispatch({ type: "setInput", input: e.target.value })}
                    sx={{
                        width: '80%',
                        bgcolor: 'white'
                    }}
                    value={chatContext.chatState.input}
                    id="fullWidth"
                    label="Message"
                    placeholder="type here ..."
                    multiline
                />
                <Button
                    onClick={() => connectSocket(chatContext.chatState.input)}
                    variant="contained"
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
            </Box>
        </>
    )
}
export default Chat