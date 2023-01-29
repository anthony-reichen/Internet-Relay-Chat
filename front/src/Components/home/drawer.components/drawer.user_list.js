import { Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { ChatContext } from '../../../Pages/Home';

function UserList() {

    const chatContext = useContext(ChatContext);

    return (
        <>
            <List>
                <Typography sx={{ display: "flex", justifyContent: "center"}} variant='h6'>Active users</Typography>
                <Divider/>
                {chatContext.chatState.users !== null && chatContext.chatState.users.map((user, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={user.username} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default UserList