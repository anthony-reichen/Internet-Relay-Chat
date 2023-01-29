import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Popover, Typography } from '@mui/material/';
import socket from '../../../config/socket';
import joinChannel from '../../../Service/Channels/service.channels_join';
import { useContext, useState } from 'react';
import { ChatContext } from '../../../Pages/Home';

function ChannelList() {

    const [anchorEl, setAnchorEl] = useState(null);
    const chatContext = useContext(ChatContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (

        <>
            <List>
                <Typography sx={{ display: "flex", justifyContent: "center"}} variant='h6'>Channels</Typography>
                <Divider/>
                {chatContext.chatState.channelsName !== null && chatContext.chatState.channelsName.map((channel, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton id='listButton' aria-describedby={id} variant="contained" onClick={handleClick}>
                            <ListItemText primary={channel} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <List component="nav" aria-label="mailbox folders">
                    <ListItemButton>
                        <ListItemText primary="Join channel" onClick={() => joinChannel(chatContext, socket)} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>channel_name
                        <ListItemText primary="Change channel name"/>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText primary="Delete channel"/>
                    </ListItemButton>
                </List>
            </Popover>
        </>
    )
}

export default ChannelList