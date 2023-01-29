import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChannelList from './drawer.components/drawer.channel_list';
import UserList from './drawer.components/drawer.user_list';

const drawerWidth = "15em";

export default function PermanentDrawer() {

    return (
        <>
            <Box sx={{
                display: "flex",
            }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box'
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <UserList/>
                    <Divider />
                    <ChannelList/>
                </Drawer>
            </Box>
        </>
    );
}