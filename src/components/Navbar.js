import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useState } from 'react';
// import CreateDialog from './CreateDialog';


export default function Navbar() {
    {

    };
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <AppBar position="static">
                    <Toolbar sx={{ bgcolor: 'primary.error' }}>
                        <Typography variant="h6" noWrap component="div">
                            <Link href={"/"}>D-code Todo</Link>
                        </Typography>
                        {/* <Button
                            variant='outlined'
                            size='large'
                            sx={{ color: 'white' }}
                        >
                            Create +
                        </Button> */}
                        
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="subtitle1" noWrap component="div" sx={{ marginRight: '10px' }}>
                        <Link href={'/create'}>Create</Link>
                        </Typography>
                        <Typography variant="subtitle1" noWrap component="div" sx={{ marginRight: '10px' }}>
                            <Link href={"/completed"}>Completed</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );
}
