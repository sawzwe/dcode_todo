import React, { useState } from 'react';
import { Box, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';

export default function Sidebar() {{

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    
    };
    return (
        <>
        <Box sx={{ width: '20%' }}>
          {/* Drawer */}
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
            <List>
              <ListItem button>
                <ListItemText primary="Test" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Completed" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Completed" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Completed" />
              </ListItem>
            </List>
          </Drawer>

          {/* Button to toggle the drawer */}
          <Button fontSize="large" onClick={toggleDrawer}>
            Menu
          </Button>
        </Box>
    </>

    );
}

