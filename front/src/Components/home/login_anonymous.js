import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import socket from '../../config/socket';
import { ChatContext } from "../../Pages/Home";
import { useContext } from "react";

function LoginAnonymous() {

    const chatContext = useContext(ChatContext);

    const onUsernameSelection = (username) => {
        chatContext.chatDispatch({ type: "setUsernameSelected" })
        chatContext.chatDispatch({ type: "setInput", input: "" })
        socket.auth = { username }
        socket.connect();
        socket.emit("joinRoom", "backroom")
    }

    return (
        <>
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Welcome to the fake IRC chat
                </Typography>
                <TextField
                    onChange={e => chatContext.chatDispatch({ type: "setInput", input: e.target.value })}
                    value={chatContext.chatState.input}
                    id="fullwidth"
                    sx={{
                        backgroundColor: 'white',
                        width: '50%'
                    }}
                />
                <Button
                    sx={{ maxWidth: "10em", mt: "3em" }}
                    onClick={() => onUsernameSelection(chatContext.chatState.input)}
                    variant="contained"
                >
                    Connect
                </Button>
            </Box>
        </>
    )
}

export default LoginAnonymous